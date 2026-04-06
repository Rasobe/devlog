-- Borramos los datos de prueba
TRUNCATE TABLE posts CASCADE;

-- Cambiamos el tipo de la columna iterativamente para PostgreSQL
ALTER TABLE posts ALTER COLUMN id DROP DEFAULT;

-- Eliminamos la secuencia autoincremental de BIGSERIAL si existe (Flyway maneja el nombre si se usó serial)
DROP SEQUENCE IF EXISTS posts_id_seq CASCADE;

-- Convertimos a UUID y definimos la función por defecto
ALTER TABLE posts ALTER COLUMN id TYPE UUID USING gen_random_uuid();
ALTER TABLE posts ALTER COLUMN id SET DEFAULT gen_random_uuid();
