export default function pingResponseTime(store) {
    return next => action => {
      return next(action);
    };
  }
  