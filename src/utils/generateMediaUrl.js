import {_hostMediaUrl} from "../redux/api";

export function generateMediaUrl (path) {
    if (path?.startsWith('http')) {
        return path;
    }
    return `${_hostMediaUrl}${path}`;
}

