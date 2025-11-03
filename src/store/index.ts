import { Command } from "@tauri-apps/plugin-shell";
import { defineStore } from "pinia";
import { ref } from "vue";

export enum ConvertStatus{
  wait,
  done,
  exist,
  error,
}

interface TaskItem{
  name: string,
  path: string,
  status: ConvertStatus,
}

export default defineStore("store", ()=>{
  let files=ref<TaskItem[]>([]);

  let useExif=ref(true);
  let override=ref(false);
  let outputDir=ref("");

  let running=ref(false);

  const convertHandler=async ()=>{
    running.value=true;
    for (const item of files.value) {
      item.status=await runConvert(item.path, outputDir.value, override.value, useExif.value);
    }
    running.value=false;
  }

  return {
    files,
    useExif,
    override,
    outputDir,
    running,
    convertHandler
  };
})

export async function runConvert(filePath: string, outputPath: string, override: boolean, exif: boolean, quality: number=80): Promise<ConvertStatus> {

  let args=[
    filePath,
    outputPath,
    "--quality",
    quality,
  ]

  if(override){
    args.push("--override");
  }

  if(!exif){
    args.push("--no-exif");
  }

  const command = Command.sidecar("binaries/core", [
    filePath,
    outputPath,
  ])
  const output = await command.execute();
  if(output.stdout.includes("Skipped")){
    return ConvertStatus.exist;
  }else if(output.stdout.includes("Failed")){
    return ConvertStatus.error;
  }
  
  return ConvertStatus.done;
}