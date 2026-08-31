def test_create_and_get_officer(test_db):
    payload = {"name": "Maria Santos", "email": "maria@example.com"}

    create_response = test_db.post("/api/v1/officers", json=payload)
    assert create_response.status_code == 201
    data = create_response.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]

    get_response = test_db.get(f"/api/v1/officers/{data['id']}")
    assert get_response.status_code == 200
    assert get_response.json()["email"] == payload["email"]


def test_list_officers(test_db):
    test_db.post("/api/v1/officers", json={"name": "Jose Rizal", "email": "jose@example.com"})

    response = test_db.get("/api/v1/officers")
    assert response.status_code == 200
    assert any(item["email"] == "jose@example.com" for item in response.json())


def test_duplicate_email_is_rejected(test_db):
    payload = {"name": "Maria Santos", "email": "dupe@example.com"}
    assert test_db.post("/api/v1/officers", json=payload).status_code == 201

    second = test_db.post("/api/v1/officers", json=payload)
    assert second.status_code == 409
    assert second.json()["detail"] == "Officer email already exists"


def test_duplicate_email_is_case_insensitive(test_db):
    assert test_db.post(
        "/api/v1/officers", json={"name": "A", "email": "Case@Example.com"}
    ).status_code == 201

    second = test_db.post(
        "/api/v1/officers", json={"name": "B", "email": "case@example.com"}
    )
    assert second.status_code == 409


def test_get_unknown_officer_returns_404(test_db):
    response = test_db.get("/api/v1/officers/999999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Officer not found"


def test_invalid_email_is_rejected(test_db):
    response = test_db.post("/api/v1/officers", json={"name": "X", "email": "not-an-email"})
    assert response.status_code == 422
