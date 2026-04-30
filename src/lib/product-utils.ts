export function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseOptionalId(value: FormDataEntryValue | null) {
  const text = cleanText(value);

  if (!text) return null;

  const id = Number(text);

  return Number.isInteger(id) && id > 0 ? id : null;
}

export function formatProductPrice(price: string) {
  const digits = price.replace(/\D/g, "");

  if (!digits) {
    return price;
  }

  return `ราคา ${Number(digits).toLocaleString("th-TH")} บาท`;
}
