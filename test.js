const getTimeCount = (time) => {
  const hour = parseInt(time / 3600);
  const second = time % 3600;
const minute = parseInt(second / 60);
const reamingSecond = second % 60
  return `${hour} hour ${minute} minute ${reamingSecond} second ago`;
};

console.log(getTimeCount(600));
