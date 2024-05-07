export function boringAvatar(name = '') {
  return `https://source.boringavatars.com/beam/120/${encodeURI(
    name,
  )}?colors=AADEAD,BBDEAD,CCDEAD,DDDEAD,EEDEAD`;
}

export function formatFieldErrorMessage(fields: Record<string, string[]>) {
  let msg = '';
  let count = 0;
  const fieldsInArray = Object.entries(fields);

  for (const [key, value] of fieldsInArray) {
    msg += `${key}: ${value[0]}`;
    if (count < fieldsInArray.length - 1) {
      msg += '\n\n';
    }

    count++;
  }
  return msg;
}
