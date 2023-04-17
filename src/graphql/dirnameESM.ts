/**
 * removed directory path construction to separate module since it's using the esm import.meta global and jest continuously fails to access it even with compiler option module set to use esm.
 */
import { fileURLToPath } from 'url';
export const getDirname = () => fileURLToPath(new URL('.', import.meta.url));
