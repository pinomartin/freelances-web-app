const getHigherTask = (tasks:any) => {
   const higherSecondsFromTasks = Math.max(...tasks.map((o:any) => o.totalSeconds), 0);
  
   const higherTask = tasks.filter((task:any) => task.totalSeconds === higherSecondsFromTasks);
  
   return higherTask;
}

export default getHigherTask
