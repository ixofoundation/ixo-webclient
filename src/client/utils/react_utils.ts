/**
 * Renders the appropriate content depending if the predicate is true or false
 */
import {IDictionary} from "../../../types/models";

export function renderIf(condition: boolean, content: {
    ifTrue?: () => JSX.Element | JSX.Element[],
    ifFalse?: () => JSX.Element | JSX.Element[]
}) : JSX.Element | JSX.Element[] {
    if (condition) {
        return content.ifTrue();
    } else {
        return content.ifFalse();
    }
}

/**
 * Renders the given content only if the condition is true
 */
export function renderIfTrue(condition: boolean, content: () => JSX.Element) : JSX.Element {
    if (condition) {
        return content();
    }
    return null;
}

/**
 * Renders the given content only if the condition is false
 */
export function renderIfFalse(condition: boolean, content: () => JSX.Element) : JSX.Element {
    if (!condition) {
        return content();
    }
    return null;
}

/**
 * Renders the appropriate content depending if the variable is defined or not
 * @param data      Data variable to check if is defined & not null
 * @param content   The content to render
 */
export function renderIfDefined<T>(data: T, content: {isDefined?: (data: T) => JSX.Element, isNotDefined?: () => JSX.Element}) : JSX.Element {
    if (typeof data !== "undefined" && data !== null) {
        return content.isDefined && content.isDefined(data);
    } else {
        return content.isNotDefined && content.isNotDefined();
    }
}

/**
 * Renders a callback from the callbacks dictionary based on a key (similar to the switch statement)
 * @param key           Key of the callback to call
 * @param callbacks     All the available callbacks
 */
export function renderSwitch(key: string | number, callbacks: IDictionary<() => JSX.Element>) : JSX.Element {
    return callbacks[key] && callbacks[key]();
}
