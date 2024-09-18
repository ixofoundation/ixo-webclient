export const singleton = <Value>(
  name: string,
  valueFactory: () => Value,
): Value => {
  const g = global as unknown as { __singletons: Record<string, unknown> };
  g.__singletons ??= {};
  g.__singletons[name] ??= valueFactory();
  return g.__singletons[name] as Value;
};

export const singletonAsync = async <Value>(
  name: string,
  valueFactory: () => Promise<Value>,
): Promise<Value> => {
  const g = global as unknown as { __singletons: Record<string, any> };
  if (!g.__singletons) {
    g.__singletons = {};
  }

  if (!g.__singletons[name]) {
    g.__singletons[name] = valueFactory(); // Store the promise itself to avoid race conditions
    g.__singletons[name] = await g.__singletons[name]; // Await the promise and then store its result
  }

  return g.__singletons[name];
};