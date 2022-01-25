CREATE DEFINER=`root`@`localhost` TRIGGER `logbook_BEFORE_INSERT` BEFORE INSERT ON `logbook` FOR EACH ROW BEGIN
set @sum_time = TIME_TO_SEC(NEW.working_hours) + (select sum(TIME_TO_SEC(working_hours)) from logbook where logbook.worker_id = NEW.worker_id);
if @sum_time > TIME_TO_SEC('20:00:00') then
SIGNAL sqlstate '45001' set message_text = "No way ! You cannot work more than 20 hours !";
end if;
END