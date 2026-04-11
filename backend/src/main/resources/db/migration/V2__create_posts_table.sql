CREATE TABLE posts
(
    id         UUID PRIMARY KEY      DEFAULT gen_random_uuid(),
    title      VARCHAR(255) NOT NULL,
    slug       VARCHAR(255) NOT NULL UNIQUE,
    content    TEXT         NOT NULL,
    excerpt    VARCHAR(500) NOT NULL,
    published  BOOLEAN      NOT NULL DEFAULT FALSE,
    views      BIGINT       NOT NULL DEFAULT 0,
    author_id  UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts (slug);
CREATE INDEX idx_posts_published ON posts (published);
CREATE INDEX idx_posts_author ON posts (author_id);