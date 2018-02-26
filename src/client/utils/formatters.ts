export function formatJSONDate(jsonDateTimeString: string) : string {
  return new Date(jsonDateTimeString).toLocaleDateString('en-US',{year: 'numeric',month:'long',day:'numeric'});
}

export function formatJSONTime(jsonDateTimeString: string) : string {
  return new Date(jsonDateTimeString).toLocaleTimeString();
}

export function formatJSONDateTime(jsonDateTimeString: string) : string {
  return new Date(jsonDateTimeString).toLocaleString('en-US',{year: 'numeric',month:'long',day:'numeric'});
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}