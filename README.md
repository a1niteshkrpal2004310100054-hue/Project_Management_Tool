export const TransformUtils = {
  /**
   * Convert camelCase to snake_case
   */
  camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  },

  /**
   * Convert snake_case to camelCase
   */
  snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  },

  /**
   * Convert object keys from camelCase to snake_case
   */
  objectCamelToSnake<T extends Record<string, any>>(
    obj: T
  ): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = this.camelToSnake(key);
      result[snakeKey] =
        this.isObject(value) && !Array.isArray(value)
          ? this.objectCamelToSnake(value)
          : Array.isArray(value) && value.length > 0 && this.isObject(value[0])
          ? value.map((item) =>
              this.isObject(item) ? this.objectCamelToSnake(item) : item
            )
          : value;
    }
    return result;
  },

  /**
   * Convert object keys from snake_case to camelCase
   */
  objectSnakeToCamel<T extends Record<string, any>>(
    obj: T
  ): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = this.snakeToCamel(key);
      result[camelKey] =
        this.isObject(value) && !Array.isArray(value)
          ? this.objectSnakeToCamel(value)
          : Array.isArray(value) && value.length > 0 && this.isObject(value[0])
          ? value.map((item) =>
              this.isObject(item) ? this.objectSnakeToCamel(item) : item
            )
          : value;
    }
    return result;
  },

  /**
   * Check if value is an object
   */
  isObject(value: any): value is Record<string, any> {
    return (
      value !== null &&
      typeof value === "object" &&
      value.constructor === Object
    );
  },

  /**
   * Deep clone object
   */
  deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array)
      return obj.map((item) => this.deepClone(item)) as unknown as T;
    if (this.isObject(obj)) {
      const cloned: Record<string, any> = {};
      for (const [key, value] of Object.entries(obj)) {
        cloned[key] = this.deepClone(value);
      }
      return cloned as T;
    }
    return obj;
  },

  /**
   * Remove null/undefined values from object
   */
  removeNullish<T extends Record<string, any>>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        result[key as keyof T] = value;
      }
    }
    return result;
  },

  /**
   * Remove empty strings from object
   */
  removeEmptyStrings<T extends Record<string, any>>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined && value !== "") {
        result[key as keyof T] = value;
      }
    }
    return result;
  },

  /**
   * Flatten nested object
   */
  flattenObject(
    obj: Record<string, any>,
    prefix: string = ""
  ): Record<string, any> {
    const flattened: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (this.isObject(value) && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  },

  /**
   * Unflatten object
   */
  unflattenObject(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const keys = key.split(".");
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current)) {
          current[k] = {};
        }
        current = current[k];
      }

      current[keys[keys.length - 1]] = value;
    }

    return result;
  },

  /**
   * Sort array of objects by multiple keys
   */
  sortByMultipleKeys<T extends Record<string, any>>(
    array: T[],
    keys: Array<{
      key: keyof T;
      direction: "asc" | "desc";
    }>
  ): T[] {
    return [...array].sort((a, b) => {
      for (const { key, direction } of keys) {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  },

  /**
   * Group array by key
   */
  groupBy<T extends Record<string, any>, K extends keyof T>(
    array: T[],
    key: K
  ): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  /**
   * Create lookup map from array
   */
  createLookupMap<T extends Record<string, any>, K extends keyof T>(
    array: T[],
    key: K
  ): Map<T[K], T> {
    return new Map(array.map((item) => [item[key], item]));
  },

  /**
   * Merge arrays by key (keeping unique items)
   */
  mergeArraysByKey<T extends Record<string, any>, K extends keyof T>(
    arrays: T[][],
    key: K
  ): T[] {
    const seen = new Set();
    const result: T[] = [];

    for (const array of arrays) {
      for (const item of array) {
        const keyValue = item[key];
        if (!seen.has(keyValue)) {
          seen.add(keyValue);
          result.push(item);
        }
      }
    }

    return result;
  },

  /**
   * Paginate array
   */
  paginate<T>(
    array: T[],
    page: number,
    limit: number
  ): {
    items: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  } {
    const offset = (page - 1) * limit;
    const items = array.slice(offset, offset + limit);
    const totalPages = Math.ceil(array.length / limit);

    return {
      items,
      meta: {
        total: array.length,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  },

  /**
   * Format file size
   */
  formatFileSize(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
  },

  /**
   * Format date to relative time
   */
  formatRelativeTime(date: string): string {
    if (!date) {
      return "--";
    }

    const dateIn = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateIn.getTime())) {
      throw new Error("Invalid date");
    }

    const now = new Date();
    const diffInMs = now.getTime() - dateIn.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return dateIn.toLocaleDateString();
  },

  /**
   * Debounce function
   */
  debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  },

  /**
   * Throttle function
   */
  throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean;
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  },
};
