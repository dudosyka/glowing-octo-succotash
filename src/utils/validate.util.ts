export interface Error {
  err: boolean,
  type: string,
  item: string
}

export class ValidateUtil {
  constructor(private object: any) {}

  checkLength(minLength: number, maxLength: number, key: string): Error | true {
    if (!this.object[key])
      return {err: true, type: 'null', item: key};

    const value = this.object[key].toString();
    if (value.length < minLength || value.length > maxLength)
      return {err: true, type: 'length', item: key};
    else
      return true;
  }
}
