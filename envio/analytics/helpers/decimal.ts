const DECIMAL_COEFFICIENT_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
const EXPONENT_REGEX = /^[+-]?\d+$/;
const LEADING_ZEROES_REGEX = /^0+(?=\d)/;
const SIGN_REGEX = /^[+-]/;
const TRAILING_ZEROES_REGEX = /0+$/;

export function addDecimalStrings(left: string, right: string): string {
  const lhs = parseDecimalParts(toDecimalString(left));
  const rhs = parseDecimalParts(toDecimalString(right));
  const scale = Math.max(lhs.fraction.length, rhs.fraction.length);

  const lhsScaled = BigInt(`${lhs.integer}${lhs.fraction.padEnd(scale, "0")}`);
  const rhsScaled = BigInt(`${rhs.integer}${rhs.fraction.padEnd(scale, "0")}`);
  return formatScaledDecimal(lhsScaled + rhsScaled, scale);
}

export function toDecimalString(value: number | string): string {
  const rawValue = value.toString();
  if (!rawValue.includes("e") && !rawValue.includes("E")) {
    return rawValue;
  }

  const [coefficient, exponentValue, extra] = rawValue.toLowerCase().split("e");
  if (
    extra !== undefined ||
    !coefficient ||
    !DECIMAL_COEFFICIENT_REGEX.test(coefficient) ||
    !EXPONENT_REGEX.test(exponentValue ?? "")
  ) {
    throw new Error(`Invalid decimal number: ${rawValue}`);
  }

  const exponent = Number(exponentValue);
  if (!Number.isSafeInteger(exponent)) {
    throw new Error(`Invalid decimal number: ${rawValue}`);
  }

  const sign = coefficient.startsWith("-") ? "-" : "";
  const unsignedCoefficient = coefficient.replace(SIGN_REGEX, "");
  const [integer, fraction = ""] = unsignedCoefficient.split(".");
  const digits = `${integer}${fraction}`;
  const decimalIndex = integer.length + exponent;

  if (decimalIndex <= 0) {
    return normalizeDecimalString(`${sign}0.${"0".repeat(-decimalIndex)}${digits}`);
  }
  if (decimalIndex >= digits.length) {
    return normalizeDecimalString(`${sign}${digits}${"0".repeat(decimalIndex - digits.length)}`);
  }

  return normalizeDecimalString(
    `${sign}${digits.slice(0, decimalIndex)}.${digits.slice(decimalIndex)}`
  );
}

function formatScaledDecimal(value: bigint, scale: number): string {
  if (scale === 0) {
    return value.toString();
  }

  const digits = value.toString().padStart(scale + 1, "0");
  const integer = digits.slice(0, -scale);
  const fraction = digits.slice(-scale);
  return normalizeDecimalString(`${integer}.${fraction}`);
}

function normalizeDecimalString(value: string): string {
  const sign = value.startsWith("-") ? "-" : "";
  const unsignedValue = value.replace(SIGN_REGEX, "");
  const [integer, fraction = ""] = unsignedValue.split(".");
  const normalizedInteger = integer.replace(LEADING_ZEROES_REGEX, "") || "0";
  const normalizedFraction = fraction.replace(TRAILING_ZEROES_REGEX, "");

  const normalizedValue =
    normalizedFraction.length > 0
      ? `${normalizedInteger}.${normalizedFraction}`
      : normalizedInteger;
  return normalizedValue === "0" ? "0" : `${sign}${normalizedValue}`;
}

function parseDecimalParts(value: string): { fraction: string; integer: string } {
  if (value.startsWith("-")) {
    throw new Error("Decimal addition only supports non-negative values");
  }

  if (!DECIMAL_COEFFICIENT_REGEX.test(value)) {
    throw new Error(`Invalid decimal number: ${value}`);
  }

  const unsignedValue = value.replace(SIGN_REGEX, "");
  const [integer, fraction = ""] = unsignedValue.split(".");
  return { fraction, integer: integer || "0" };
}
