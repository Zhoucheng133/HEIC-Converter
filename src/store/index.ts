import { message } from "@tauri-apps/plugin-dialog";
import { Command } from "@tauri-apps/plugin-shell";
import { defineStore } from "pinia";
import { ref } from "vue";

export enum ConvertStatus{
  wait,
  done,
  exist,
  error,
}

interface RunResult{
  status: ConvertStatus,
  message: string
}

interface TaskItem{
  name: string,
  path: string,
  status: ConvertStatus,
  message: string,
}

export default defineStore("store", ()=>{
  let files=ref<TaskItem[]>([]);

  let useExif=ref(true);
  let override=ref(false);
  let outputDir=ref("");

  let running=ref(false);

  const convertHandler=async ()=>{
    if(running.value){
      return;
    }
    running.value=true;

    let taskCount: number=files.value.length;

    for (const item of files.value) {
      if(item.status==ConvertStatus.done){
        taskCount-=1;
        continue;
      }else if(running.value){
        const result=await runConvert(item.path, outputDir.value, override.value, useExif.value);
        item.status=result.status;
        item.message=result.message;
        console.log(result.message);
        
      }else{
        break;
      }
    }
    running.value=false;
    
    if(taskCount==0){
      await message('已完成所有的转换任务', { title: '无法运行', kind: 'error' });
    }
  }

  const stop=()=>{
    running.value=false;
  }

  return {
    files,
    useExif,
    override,
    outputDir,
    running,
    convertHandler,
    stop
  };
})

export async function runConvert(filePath: string, outputPath: string, override: boolean, exif: boolean, quality: number=80): Promise<RunResult> {

  let args=[
    filePath,
    outputPath,
    "--quality",
    String(quality),
  ]

  if(override){
    args.push("--override");
  }

  if(!exif){
    args.push("--no-exif");
  }

  const command = Command.sidecar("binaries/core", args, {
    encoding: "utf-8",
    env: {
      "PYTHONUTF8": "1",
      "LANG": "en_US.UTF-8",
      "LC_ALL": "en_US.UTF-8"
    }
  })
  const output = await command.execute();
  if(output.stdout.includes("Skipped")){
    return {
      status: ConvertStatus.exist,
      message: output.stdout
    };
  }else if(output.stdout.includes("Failed")){
    return {
      status: ConvertStatus.error,
      message: output.stdout
    };
  }
  
  return {
    status: ConvertStatus.done,
    message: output.stdout,
  };
}