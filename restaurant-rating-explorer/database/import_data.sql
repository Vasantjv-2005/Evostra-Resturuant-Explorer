    -- ============================================================================
    -- Data Import Script: restaurant_explorer
    -- PostgreSQL COPY / \copy Instructions for data/raw CSV files
    -- File: database/import_data.sql
    -- ============================================================================
    -- CRITICAL IMPORT REQUIREMENTS:
    --
    -- 1. Explicit Destination Column Lists (Requirement 3):
    --    Tables such as 'public.restaurants' and 'public.ratings' contain an extra
    --    'created_at' timestamp column with a DEFAULT value. Every COPY / \copy
    --    statement MUST explicitly specify the destination columns so that PostgreSQL
    --    maps the CSV input correctly and does not throw missing-column errors.
    --
    -- 2. Operating Hours Identity Mapping (Requirement 2):
    --    'public.restaurant_operating_hours' contains an identity column 'id' as
    --    its surrogate primary key. The raw CSV ('chefmozhours4.csv') contains only
    --    3 columns: placeID, hours, days.
    --    Import commands MUST explicitly map destination columns to (place_id, hours, days),
    --    allowing PostgreSQL to automatically generate sequential IDs for every row.
    --
    -- 3. Converting '?' Placeholders to SQL NULL (Requirement 4):
    --    In 'geoplaces2.csv' (and consumer profiles), missing data is indicated by '?'.
    --    All commands include 'NULL ''?''' so that PostgreSQL stores real SQL NULLs
    --    rather than literal question mark characters.
    --
    -- 4. Preservation of Unmatched Cuisines (Requirement 1):
    --    'chefmozcuisine.csv' imports all 916 rows (112 matched + 804 unmatched)
    --    without foreign key violations.
    --
    -- 5. Data Privacy (Requirement 5):
    --    The core application import flow (Steps 1 to 6) ONLY imports public restaurant
    --    and ratings data. Consumer personal profiles, payment preferences, and cuisine
    --    tastes are isolated in Section 7 and MUST NOT be imported into public applications.
    --
    -- 6. Import Sequence:
    --    Step 1: public.restaurants (Required first: referenced by ratings)
    --    Step 2: public.restaurant_cuisines (Preserves all 916 rows)
    --    Step 3: public.restaurant_payments
    --    Step 4: public.restaurant_operating_hours (Auto-generates identity ID)
    --    Step 5: public.restaurant_parking
    --    Step 6: public.ratings (Depends on public.restaurants)
    -- ============================================================================


    -- ============================================================================
    -- METHOD A: pgAdmin 4 GUI Import Instructions
    -- ============================================================================
    -- For each table in pgAdmin Object Explorer:
    --   Right-click table -> "Import/Export Data..." -> Toggle to "Import".
    --
    -- 1. General Tab:
    --    - Filename: Browse to the corresponding CSV file in 'data/raw/'.
    --    - Format: csv
    --    - Encoding: UTF8 (or LATIN1 for files with special characters)
    --
    -- 2. Options Tab:
    --    - Header: Yes (checked)
    --    - Delimiter: ,
    --    - Quote: "
    --    - Escape: "
    --    - NULL Strings: ?   <-- CRITICAL: Converts '?' into SQL NULL (Requirement 4)
    --
    -- 3. Columns Tab (CRITICAL for Requirements 2 & 3):
    --    - public.restaurants:
    --        Ensure columns (place_id, latitude, longitude, the_geom_meter, name,
    --        address, city, state, country, fax, zip, alcohol, smoking_area, dress_code,
    --        accessibility, price, url, rambience, franchise, area, other_services)
    --        are selected.
    --        --> UNCHECK / DESELECT 'created_at' so PostgreSQL applies DEFAULT now().
    --
    --    - public.restaurant_cuisines:
    --        Map columns: place_id, cuisine.
    --
    --    - public.restaurant_payments:
    --        Map columns: place_id, payment_method.
    --
    --    - public.restaurant_operating_hours:
    --        --> UNCHECK / DESELECT 'id'.
    --        Ensure only (place_id, hours, days) are checked so PostgreSQL
    --        generates identity IDs automatically.
    --
    --    - public.restaurant_parking:
    --        Map columns: place_id, parking_type.
    --
    --    - public.ratings:
    --        Ensure (user_id, place_id, rating, food_rating, service_rating) are checked.
    --        --> UNCHECK / DESELECT 'created_at'.
    -- ============================================================================


    -- ============================================================================
    -- METHOD B: Command Line / psql (\copy Statements)
    -- Run these commands from the root of the project directory in psql.
    -- Note: Replace relative paths with absolute paths if executing server-side COPY.
    -- ============================================================================

    -- ----------------------------------------------------------------------------
    -- Step 1: Import Public Restaurants (geoplaces2.csv - 130 records)
    -- Explicitly specifies 21 destination columns; 'created_at' receives DEFAULT.
    -- ----------------------------------------------------------------------------
    \copy public.restaurants (place_id, latitude, longitude, the_geom_meter, name, address, city, state, country, fax, zip, alcohol, smoking_area, dress_code, accessibility, price, url, rambience, franchise, area, other_services) FROM 'data/raw/geoplaces2.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- ----------------------------------------------------------------------------
    -- Step 2: Import Restaurant Cuisines (chefmozcuisine.csv - 916 records)
    -- Preserves all 916 rows (112 matched + 804 unmatched).
    -- ----------------------------------------------------------------------------
    \copy public.restaurant_cuisines (place_id, cuisine) FROM 'data/raw/chefmozcuisine.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- ----------------------------------------------------------------------------
    -- Step 3: Import Restaurant Payments (chefmozaccepts.csv - 1,314 records)
    -- ----------------------------------------------------------------------------
    \copy public.restaurant_payments (place_id, payment_method) FROM 'data/raw/chefmozaccepts.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- ----------------------------------------------------------------------------
    -- Step 4: Import Restaurant Operating Hours (chefmozhours4.csv - 2,339 records)
    -- Maps only (place_id, hours, days); PostgreSQL auto-generates identity 'id'.
    -- ----------------------------------------------------------------------------
    \copy public.restaurant_operating_hours (place_id, hours, days) FROM 'data/raw/chefmozhours4.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- ----------------------------------------------------------------------------
    -- Step 5: Import Restaurant Parking (chefmozparking.csv - 702 records)
    -- ----------------------------------------------------------------------------
    \copy public.restaurant_parking (place_id, parking_type) FROM 'data/raw/chefmozparking.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- ----------------------------------------------------------------------------
    -- Step 6: Import Restaurant Ratings (rating_final.csv - 1,161 records)
    -- Explicitly specifies 5 destination columns; 'created_at' receives DEFAULT.
    -- ----------------------------------------------------------------------------
    \copy public.ratings (user_id, place_id, rating, food_rating, service_rating) FROM 'data/raw/rating_final.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');


    -- ============================================================================
    -- SECTION 7: ISOLATED CONSUMER DATA (Requirement 5)
    -- WARNING: DO NOT IMPORT INTO PUBLIC APPLICATION DATABASE.
    -- Sourced from: userprofile.csv, userpayment.csv, usercuisine.csv.
    -- Kept strictly isolated in 'consumer_analytics' schema for offline recommender
    -- research only.
    -- ============================================================================
    /*
    -- Step 7a: Import Consumer Profiles (138 records)
    \copy consumer_analytics.consumer_profiles (user_id, latitude, longitude, smoker, drink_level, dress_preference, ambience, transport, marital_status, hijos, birth_year, interest, personality, religion, activity, color, weight, budget, height) FROM 'data/raw/userprofile.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- Step 7b: Import Consumer Payment Preferences (177 records)
    \copy consumer_analytics.consumer_payment_preferences (user_id, payment_method) FROM 'data/raw/userpayment.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');

    -- Step 7c: Import Consumer Cuisine Preferences (330 records)
    \copy consumer_analytics.consumer_cuisine_preferences (user_id, cuisine) FROM 'data/raw/usercuisine.csv' WITH (FORMAT csv, HEADER true, NULL '?', ENCODING 'LATIN1');
    */
