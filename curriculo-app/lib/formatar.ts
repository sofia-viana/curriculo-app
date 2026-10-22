export function mesAno(data?: string | null) {
  if (!data) return "";
  const [ano, mes] = data.split("-");
  return `${mes}/${ano}`;
}

export function periodo(inicio?: string | null, fim?: string | null) {
  return `${mesAno(inicio)} até ${mesAno(fim) || "hoje"}`;
}

export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}