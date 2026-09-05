"""create core tables

Creates officers, waste_events, rewards and stellar_transactions.

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-08-31

"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0001_initial_schema"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "officers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_officers_id"), "officers", ["id"], unique=False)
    op.create_index(op.f("ix_officers_email"), "officers", ["email"], unique=True)

    op.create_table(
        "waste_events",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("officer_id", sa.Integer(), nullable=False),
        sa.Column("waste_type", sa.String(length=50), nullable=False),
        sa.Column("weight_grams", sa.Integer(), nullable=False),
        sa.Column("points_awarded", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.CheckConstraint(
            "waste_type IN ('biodegradable', 'recyclable_paper', 'recyclable_plastic')",
            name="waste_type_check",
        ),
        sa.ForeignKeyConstraint(["officer_id"], ["officers.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_waste_events_id"), "waste_events", ["id"], unique=False)
    op.create_index(
        op.f("ix_waste_events_officer_id"), "waste_events", ["officer_id"], unique=False
    )

    op.create_table(
        "rewards",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("officer_id", sa.Integer(), nullable=False),
        sa.Column("points", sa.Integer(), nullable=False),
        sa.Column("reason", sa.String(length=200), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["officer_id"], ["officers.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_rewards_id"), "rewards", ["id"], unique=False)
    op.create_index(op.f("ix_rewards_officer_id"), "rewards", ["officer_id"], unique=False)

    op.create_table(
        "stellar_transactions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("officer_id", sa.Integer(), nullable=False),
        sa.Column("stellar_transaction_hash", sa.String(length=128), nullable=False),
        sa.Column("amount", sa.Numeric(precision=18, scale=7), nullable=False),
        sa.Column("asset_code", sa.String(length=12), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["officer_id"], ["officers.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_stellar_transactions_id"), "stellar_transactions", ["id"], unique=False
    )
    op.create_index(
        op.f("ix_stellar_transactions_officer_id"),
        "stellar_transactions",
        ["officer_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_stellar_transactions_stellar_transaction_hash"),
        "stellar_transactions",
        ["stellar_transaction_hash"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_stellar_transactions_stellar_transaction_hash"),
        table_name="stellar_transactions",
    )
    op.drop_index(
        op.f("ix_stellar_transactions_officer_id"), table_name="stellar_transactions"
    )
    op.drop_index(op.f("ix_stellar_transactions_id"), table_name="stellar_transactions")
    op.drop_table("stellar_transactions")

    op.drop_index(op.f("ix_rewards_officer_id"), table_name="rewards")
    op.drop_index(op.f("ix_rewards_id"), table_name="rewards")
    op.drop_table("rewards")

    op.drop_index(op.f("ix_waste_events_officer_id"), table_name="waste_events")
    op.drop_index(op.f("ix_waste_events_id"), table_name="waste_events")
    op.drop_table("waste_events")

    op.drop_index(op.f("ix_officers_email"), table_name="officers")
    op.drop_index(op.f("ix_officers_id"), table_name="officers")
    op.drop_table("officers")
