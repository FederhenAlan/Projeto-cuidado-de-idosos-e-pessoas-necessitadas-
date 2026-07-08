-- ================================================================
-- BANCO DE DADOS: bd_cuidado_idosos
-- Sistema de cuidado e monitoramento de idosos e pessoas com
-- necessidades específicas
-- ================================================================

CREATE DATABASE IF NOT EXISTS bd_cuidado_idosos;
USE bd_cuidado_idosos;

-- ================================================================
-- 1. USUÁRIOS E PERFIS (login, cuidador, responsável)
-- ================================================================

CREATE TABLE usuario (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    login           VARCHAR(50) NOT NULL UNIQUE,
    senha           VARCHAR(255) NOT NULL,
    tipo_usuario    ENUM('cuidador', 'responsavel') NOT NULL,
    ativo           BOOLEAN DEFAULT TRUE,
    criado_em       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE paciente (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    cpf             CHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE,
    sexo            ENUM('M', 'F', 'Outro'),
    telefone        VARCHAR(20),
    endereco        TEXT,
    status_atencao  ENUM('Estável', 'Atenção', 'Crítico') DEFAULT 'Estável',
    observacoes     TEXT
);

CREATE TABLE cuidador (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id      BIGINT NOT NULL UNIQUE,
    nome            VARCHAR(150) NOT NULL,
    sexo            ENUM('M', 'F', 'Outro'),
    telefone        VARCHAR(20),
    cpf             CHAR(11) UNIQUE,
    especializacao  VARCHAR(150),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE responsavel (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id      BIGINT NOT NULL UNIQUE,
    nome            VARCHAR(150) NOT NULL,
    cpf             CHAR(11) UNIQUE,
    telefone        VARCHAR(20),
    data_nascimento DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- ================================================================
-- 2. VÍNCULOS entre stakeholders e paciente
-- ================================================================

CREATE TABLE responsavel_paciente (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    responsavel_id      BIGINT NOT NULL,
    paciente_id         BIGINT NOT NULL,
    grau_parentesco     VARCHAR(50),
    -- permissão para editar paciente e convidar cuidadores (citado no doc)
    pode_editar_paciente BOOLEAN DEFAULT TRUE,
    pode_convidar_cuidador BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (responsavel_id) REFERENCES responsavel(id) ON DELETE CASCADE,
    FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE CASCADE,
    UNIQUE (responsavel_id, paciente_id)
);

CREATE TABLE cuidador_paciente (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    cuidador_id     BIGINT NOT NULL,
    paciente_id     BIGINT NOT NULL,
    turno           VARCHAR(50),   -- ex: diurno, noturno
    data_inicio     DATE,
    data_fim        DATE,
    observacoes     TEXT,
    FOREIGN KEY (cuidador_id) REFERENCES cuidador(id) ON DELETE CASCADE,
    FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE CASCADE,
    UNIQUE (cuidador_id, paciente_id)
);

-- Criar mais tabelas (medicamentos, diário etc.);