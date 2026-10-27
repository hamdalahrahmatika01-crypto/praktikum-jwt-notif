const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error(
      'Tidak dapat terhubung ke server. Periksa IP backend di .env dan pastikan HP & laptop satu jaringan.'
    );
  }

  const data = res.status === 204 ? null : await res.json();

  if (!res.ok) {
    throw new Error(data?.pesan || 'Request gagal');
  }

  return data;
}
