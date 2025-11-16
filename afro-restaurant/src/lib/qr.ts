import QRCode from "qrcode";

export async function generateTableQr({
  slug,
  baseUrl,
}: {
  slug: string;
  baseUrl: string;
}) {
  const url = `${baseUrl}/qr/${slug}`;
  const dataUrl = await QRCode.toDataURL(url, {
    margin: 1,
    width: 320,
    color: { dark: "#000000", light: "#ffffff" },
  });
  return { url, dataUrl };
}
