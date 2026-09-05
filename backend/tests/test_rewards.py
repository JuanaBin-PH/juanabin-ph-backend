def test_reward_retrieval(test_db):
    officer_response = test_db.post("/api/v1/officers", json={"name": "Ben Reyes", "email": "ben@example.com"})
    officer_id = officer_response.json()["id"]

    create_reward = test_db.post("/api/v1/rewards", json={"officer_id": officer_id, "points": 200, "reason": "bonus"})
    assert create_reward.status_code == 201

    rewards_response = test_db.get("/api/v1/rewards")
    assert rewards_response.status_code == 200
    assert any(item["officer_id"] == officer_id for item in rewards_response.json())
