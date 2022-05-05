class StorageUtil {
  constructor() {}
  get(key: string): string {
    let data = null;
    if (typeof window !== 'undefined') {
      data = localStorage.getItem(key);
    }

    if (data === null) return '';
    return data;
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default StorageUtil;
