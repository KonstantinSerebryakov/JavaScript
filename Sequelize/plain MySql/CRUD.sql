use leverx_courses;
-- create work
INSERT INTO works (`name`,`created_at`,`updated_at`) VALUES ("work2",now(),now());
-- create worker
INSERT INTO workers (`first_name`, `last_name`,`created_at`,`updated_at`) VALUES ("name1", "surname1",now(),now());
-- join work
INSERT INTO logbook (`salary`, `working_hours`, `work_id`, `worker_id`, `created_at`, `updated_at`) VALUES (800, "08:00:00", 1, 1,now(),now());
-- drop work-worker
DELETE FROM logbook where logbook.work_id = 1 and logbook.worker_id = 1;
-- display workers works
SELECT * FROM worker_full_view;
-- display works workers
SELECT * FROM works_full_view;
