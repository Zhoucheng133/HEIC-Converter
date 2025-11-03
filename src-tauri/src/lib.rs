use std::{fs, path::Path};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn resolve_files(paths: Vec<String>) -> Vec<String> {
    let mut heic_files = Vec::new();

    for path_str in paths {
        let path = Path::new(&path_str);

        if path.is_file() {
            if let Some(ext) = path.extension().and_then(|e| e.to_str()) {
                if ext.eq_ignore_ascii_case("heic") {
                    heic_files.push(path_str.clone());
                }
            }
        } else if path.is_dir() {
            if let Ok(entries) = fs::read_dir(path) {
                for entry in entries.flatten() {
                    let entry_path = entry.path();
                    if entry_path.is_file() {
                        if let Some(ext) = entry_path.extension().and_then(|e| e.to_str()) {
                            if ext.eq_ignore_ascii_case("heic") {
                                if let Some(path_str) = entry_path.to_str() {
                                    heic_files.push(path_str.to_string());
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if heic_files.is_empty() {
        return vec!["".to_string()];
    }

    return heic_files
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![resolve_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
