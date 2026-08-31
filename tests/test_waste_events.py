import pytest


def _create_officer(client, email: str) -> int:
    response = client.post("/api/v1/officers", json={"name": "Ana Cruz", "email": email})
    assert response.status_code == 201
    return response.json()["id"]


def test_create_waste_event_assigns_points(test_db):
    officer_id = _create_officer(test_db, "ana@example.com")

    payload = {
        "officer_id": officer_id,
        "waste_type": "recyclable_plastic",
        "weight_grams": 1500,
    }
    response = test_db.post("/api/v1/waste-events", json=payload)
    assert response.status_code == 201
    data = response.json()

    # 1500g -> 15 full 100g units, plastic is 30 points per unit.
    assert data["points_awarded"] == 450
    assert data["waste_type"] == "recyclable_plastic"

    list_response = test_db.get("/api/v1/waste-events")
    assert list_response.status_code == 200
    assert len(list_response.json()) >= 1


@pytest.mark.parametrize(
    ("waste_type", "weight_grams", "expected_points"),
    [
        ("biodegradable", 1000, 100),
        ("recyclable_paper", 1000, 200),
        ("recyclable_plastic", 1000, 300),
        ("biodegradable", 99, 0),
        ("recyclable_paper", 250, 40),
    ],
)
def test_points_calculation_per_category(test_db, waste_type, weight_grams, expected_points):
    officer_id = _create_officer(test_db, f"{waste_type}-{weight_grams}@example.com")

    response = test_db.post(
        "/api/v1/waste-events",
        json={
            "officer_id": officer_id,
            "waste_type": waste_type,
            "weight_grams": weight_grams,
        },
    )
    assert response.status_code == 201
    assert response.json()["points_awarded"] == expected_points


def test_waste_type_is_normalised(test_db):
    officer_id = _create_officer(test_db, "normalise@example.com")

    response = test_db.post(
        "/api/v1/waste-events",
        json={
            "officer_id": officer_id,
            "waste_type": "  Recyclable_Paper  ",
            "weight_grams": 500,
        },
    )
    assert response.status_code == 201
    assert response.json()["waste_type"] == "recyclable_paper"


def test_unsupported_waste_type_is_rejected(test_db):
    officer_id = _create_officer(test_db, "bad-type@example.com")

    response = test_db.post(
        "/api/v1/waste-events",
        json={
            "officer_id": officer_id,
            "waste_type": "hazardous",
            "weight_grams": 500,
        },
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported waste type"
