use std::fs;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn check_path(path: &str) -> String {
    if let Ok(metadata) = fs::metadata(path){
        if metadata.is_dir() {
            "dir".into()
        } else if metadata.is_file(){
            "file".into()
        }else {
            "Unkown path".into()
        }
    }else {
        "File or directory not exist".into()
    }
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![check_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
