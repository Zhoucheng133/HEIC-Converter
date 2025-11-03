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
  path: string,
  status: ConvertStatus,
}

export default defineStore("store", ()=>{
  let files=ref<TaskItem[]>([]);
  return { files };
})

export async function runConvert(filePath: string, outputPath: string, override: boolean, { quality=80 }, exif: boolean): Promise<ConvertStatus> {

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