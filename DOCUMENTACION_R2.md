# Documentación de carga de catálogos (R2 + UI)

Esta guía resume cómo conectar PDFs del bucket **Cloudflare R2** al proyecto **catalogo-bnext-design** sin descargar archivos locales. La idea es que la app apunte **siempre** a las URLs públicas de R2.

## 1) Estructura del proyecto
- Frontend: React + Vite.
- Archivo principal: `src/App.tsx`.
- Las tarjetas (categorías/subcategorías) usan `pdfUrl` para abrir el PDF en el visor.

## 2) Bucket y rutas
Base pública R2:
```
https://pub-273a525c44c946388add7b34ab7cac51.r2.dev
```

Carpetas principales:
- `restaurante/` para los catálogos de restaurantes (subcategorías por país).
- `locales/` para las demás tarjetas (bar, barbería, cafetería, etc.).

La URL final se forma así:
```
<BASE>/<CARPETA>/<NOMBRE EXACTO DEL ARCHIVO>
```

> Importante: R2 es **case-sensitive**. El nombre del archivo debe coincidir **exactamente** (mayúsculas, minúsculas, acentos, plurales).

## 3) Cómo se construyen las URLs en el código
En `src/App.tsx` existen utilidades:
```ts
const R2_BASE = 'https://pub-273a525c44c946388add7b34ab7cac51.r2.dev';
const r2Url = (path: string) => `${R2_BASE}/${encodeURI(path)}`;
const r2RestauranteFile = (filename: string) => r2Url(`restaurante/${filename}`);
const r2LocalesFile = (filename: string) => r2Url(`locales/${filename}`);
```

Luego, cada tarjeta usa `pdfUrl` con el nombre exacto del PDF:
```ts
{ id: 'bar', name: 'Bar', icon: Wine, pdfUrl: r2LocalesFile('catalogo Bar.pdf') }
```

## 4) Catálogos de restaurante (países)
Los archivos confirmados en R2 (carpeta `restaurante/`):
- `catalogo restaurantes Chino.pdf`
- `catalogo restaurantes HINDU.pdf`
- `catalogo restaurantes Venezolanos.pdf`
- `catalogo restaurantes americano.pdf`
- `catalogo restaurantes arabe.pdf`
- `catalogo restaurantes colombianos.pdf`
- `catalogo restaurantes mexicanos.pdf`

Si aparece un 404, revisa:
- Mayúsculas/minúsculas.
- Singular/plural.
- Acentos.

## 5) Catálogos de locales (otras tarjetas)
Ejemplos en `locales/`:
- `catalogo Bar.pdf`
- `catalogo barberia.pdf`
- `catalogo cafetería.pdf`
- `catalogo farmacia.pdf`
- `catalogo Clinica médica.pdf`
- `catalogo clinica dental.pdf`
- `catalogo estetica.pdf`
- `catalogo pizzeria.pdf`
- `catalogo heladeria.pdf`
- `catalogo Salon.pdf`

## 6) Reglas para “guardar” o agregar nuevos archivos
1. **Subir el PDF a R2** en la carpeta correcta (`restaurante/` o `locales/`).
2. **Copiar el nombre exacto** del archivo (con mayúsculas/acentos/plurales).
3. **Actualizar `src/App.tsx`** usando `r2RestauranteFile` o `r2LocalesFile`.
4. Probar en local con:
```
cd F:\Catalogo-Letrero\catalogo-bnext-design
npm run dev
```

## 7) Buenas prácticas
- No descargar PDFs al repo si el objetivo es servir desde R2.
- Evitar nombres ambiguos y mantener un patrón consistente.
- Si cambia el nombre de un archivo en R2, hay que actualizar el `pdfUrl`.

---

## Resumen rápido
Si hay un nuevo PDF:
1. Subir a R2.
2. Copiar nombre exacto.
3. Asignar en `App.tsx` con la función correcta.
4. Probar en el navegador.

