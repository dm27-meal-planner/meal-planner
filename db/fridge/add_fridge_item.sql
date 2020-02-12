INSERT INTO fridge_item (quantity, unit, date_added, ingredient_name)
VALUES ($1, $2, CURRENT_TIMESTAMP(0), $3)
RETURNING fridge_item_id;