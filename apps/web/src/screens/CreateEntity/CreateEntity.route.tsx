import React from 'react'
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'

export async function loader(args: LoaderFunctionArgs) {
  const module = await import('./CreateEntity');
  return module.loader ? module.loader(args) : Promise.reject(new Error("Loader not found"));
}

export async function action(args: ActionFunctionArgs) {
  const module = await import('./CreateEntity');
  return module.action ? module.action(args) : Promise.reject(new Error("Action not found"));
}

export const Component = React.lazy(() => import('./CreateEntity'));
