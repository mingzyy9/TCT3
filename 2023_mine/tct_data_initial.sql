-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.6.11-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- kickboard_svc 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `kickboard_svc` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `kickboard_svc`;

-- 테이블 kickboard_svc.t_admin 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_admin` (
  `USER_NO` varchar(20) NOT NULL DEFAULT '',
  `COM_NO` varchar(20) DEFAULT NULL COMMENT '사번',
  `COM_GR` varchar(20) DEFAULT NULL COMMENT '직급',
  `PART_NAME` varchar(20) DEFAULT NULL COMMENT '부서명',
  `REG_DATE` date NOT NULL COMMENT '등록일자',
  PRIMARY KEY (`USER_NO`),
  CONSTRAINT `FK_t_admin_t_user` FOREIGN KEY (`USER_NO`) REFERENCES `t_user` (`USER_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='관리자\r\n';

-- 테이블 데이터 kickboard_svc.t_admin:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_admin` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_card_pay 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_card_pay` (
  `SVC_USE_PAY_NO` varchar(20) NOT NULL COMMENT '서비스이용결제번호',
  `CARD_SERIAL` varchar(20) NOT NULL COMMENT '카드일련번호',
  `APPROVE_NO` varchar(20) DEFAULT NULL COMMENT '승인번호',
  PRIMARY KEY (`SVC_USE_PAY_NO`),
  KEY `FK_t_card_pay_t_creditcard` (`CARD_SERIAL`),
  CONSTRAINT `FK_t_card_pay_t_creditcard` FOREIGN KEY (`CARD_SERIAL`) REFERENCES `t_creditcard` (`CARD_SERIAL`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_t_card_pay_t_svc_use_pay` FOREIGN KEY (`SVC_USE_PAY_NO`) REFERENCES `t_svc_use_pay` (`SVC_USE_PAY_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='카드결제\r\n';

-- 테이블 데이터 kickboard_svc.t_card_pay:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_card_pay` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_card_pay` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_creditcard 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_creditcard` (
  `CARD_SERIAL` varchar(20) NOT NULL COMMENT '카드일련번호',
  `USER_NO` varchar(20) NOT NULL COMMENT '회원번호',
  `CARD_COMPANY` varchar(20) NOT NULL COMMENT '카드사',
  `CARD_NO` varchar(20) NOT NULL COMMENT '카드번호',
  `EXPRIATION_DATE` datetime NOT NULL COMMENT '만료일자',
  `BASIC_SET` varchar(1) NOT NULL COMMENT '기본결제카드여부',
  PRIMARY KEY (`CARD_SERIAL`),
  KEY `FK_t_creditcard_t_user` (`USER_NO`),
  CONSTRAINT `FK_t_creditcard_t_user` FOREIGN KEY (`USER_NO`) REFERENCES `t_user` (`USER_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='신용카드';

-- 테이블 데이터 kickboard_svc.t_creditcard:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_creditcard` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_creditcard` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_general 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_general` (
  `USER_NO` varchar(20) NOT NULL COMMENT '회원번호',
  `HOLD_POINT` bigint(20) NOT NULL DEFAULT 0 COMMENT '보유포인트',
  PRIMARY KEY (`USER_NO`),
  CONSTRAINT `FK__t_user` FOREIGN KEY (`USER_NO`) REFERENCES `t_user` (`USER_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='일반회원\r\n';

-- 테이블 데이터 kickboard_svc.t_general:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_general` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_general` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_kickboard 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_kickboard` (
  `DEVICE_NO` varchar(20) NOT NULL COMMENT '전동기기번호',
  `MODEL_NAME` varchar(20) DEFAULT NULL COMMENT '모델명',
  `OP_CODE` varchar(20) DEFAULT NULL COMMENT '운행상태코드',
  `BATTERY_STATE` int(11) DEFAULT NULL COMMENT '배터리잔량',
  `SVC_START_DT` datetime DEFAULT NULL COMMENT '서비스시작일자',
  `LAST_MAINTENANCE` datetime DEFAULT NULL COMMENT '최종정비일자',
  PRIMARY KEY (`DEVICE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='킥보드장비';

-- 테이블 데이터 kickboard_svc.t_kickboard:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_kickboard` DISABLE KEYS */;
INSERT INTO `t_kickboard` (`DEVICE_NO`, `MODEL_NAME`, `OP_CODE`, `BATTERY_STATE`, `SVC_START_DT`, `LAST_MAINTENANCE`) VALUES
	('DE00001', 'KA-001', '1', 1000, '2022-10-13 13:57:57', '2022-11-13 13:58:05'),
	('DE00002', 'KA-002', '1', 1000, '2022-10-13 13:57:57', '2022-11-13 13:58:05'),
	('DE00003', 'KB-001', '1', 1000, '2022-10-13 13:57:57', '2022-11-13 13:58:05'),
	('DE00004', 'KB-002', '1', 1000, '2022-10-13 13:57:57', '2022-11-13 13:58:05'),
	('DE00005', 'SP-001', '1', 1000, '2022-10-13 13:57:57', '2022-11-13 13:58:05');
/*!40000 ALTER TABLE `t_kickboard` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_point_buy 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_point_buy` (
  `POINT_BUY_NO` varchar(20) NOT NULL COMMENT '포인트구매번호',
  `CARD_SERIAL` varchar(20) NOT NULL COMMENT '카드일련번호',
  `BUY_DATETIME` datetime NOT NULL COMMENT '구매일시',
  `BUY_COST` bigint(12) NOT NULL DEFAULT 0 COMMENT '구매금액',
  `BUY_POINT` bigint(12) NOT NULL DEFAULT 0 COMMENT '구매포인트',
  PRIMARY KEY (`POINT_BUY_NO`),
  KEY `FK_t_point_buy_t_creditcard` (`CARD_SERIAL`),
  CONSTRAINT `FK_t_point_buy_t_creditcard` FOREIGN KEY (`CARD_SERIAL`) REFERENCES `t_creditcard` (`CARD_SERIAL`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='포인트구매';

-- 테이블 데이터 kickboard_svc.t_point_buy:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_point_buy` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_point_buy` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_point_pay 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_point_pay` (
  `SVC_USE_PAY_NO` varchar(20) NOT NULL COMMENT '서비스이용결제번호',
  `USED_POINT` bigint(12) NOT NULL DEFAULT 0 COMMENT '차감포인트',
  PRIMARY KEY (`SVC_USE_PAY_NO`),
  CONSTRAINT `FK__t_svc_use_pay` FOREIGN KEY (`SVC_USE_PAY_NO`) REFERENCES `t_svc_use_pay` (`SVC_USE_PAY_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='포인트결제\r\n';

-- 테이블 데이터 kickboard_svc.t_point_pay:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_point_pay` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_point_pay` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_position 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_position` (
  `DEVICE_NO` varchar(20) NOT NULL COMMENT '전동기기번호',
  `SAVE_DATETIME` datetime NOT NULL COMMENT '저장일시',
  `GPS_LATITUDE` float DEFAULT NULL COMMENT 'GPS_위도좌표',
  `GPS_LONGITUDE` float DEFAULT NULL COMMENT 'GPS_경도좌표',
  PRIMARY KEY (`DEVICE_NO`,`SAVE_DATETIME`),
  CONSTRAINT `FK__t_kickboard` FOREIGN KEY (`DEVICE_NO`) REFERENCES `t_kickboard` (`DEVICE_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='위치';

-- 테이블 데이터 kickboard_svc.t_position:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_position` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_position` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_svc_use 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_svc_use` (
  `USE_NO` varchar(20) NOT NULL COMMENT '서비스이용번호',
  `USER_NO` varchar(20) NOT NULL COMMENT '회원번호',
  `MACHINE_NO` varchar(20) NOT NULL COMMENT '전동기기번호',
  `CHARGE_NO` varchar(20) NOT NULL COMMENT '이용요금번호',
  `USE_START_DT` datetime NOT NULL COMMENT '이용시작일시',
  `USE_END_DT` datetime NOT NULL COMMENT '이용종료일시',
  `USE_DISTANCE` int(6) DEFAULT NULL COMMENT '이용거리',
  `USE_TIME` int(6) DEFAULT NULL COMMENT '이용시간(분)',
  `USE_CHARGE` int(10) DEFAULT NULL COMMENT '이용요금(원)',
  `EARNED_POINT` int(10) DEFAULT NULL COMMENT '적립포인트',
  PRIMARY KEY (`USE_NO`),
  KEY `FK_t_svc_use_t_user` (`USER_NO`),
  KEY `FK_t_svc_use_t_kickboard` (`MACHINE_NO`),
  KEY `FK_t_svc_use_t_use_cost` (`CHARGE_NO`),
  CONSTRAINT `FK_t_svc_use_t_kickboard` FOREIGN KEY (`MACHINE_NO`) REFERENCES `t_kickboard` (`DEVICE_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_t_svc_use_t_use_cost` FOREIGN KEY (`CHARGE_NO`) REFERENCES `t_use_cost` (`CHARGE_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_t_svc_use_t_user` FOREIGN KEY (`USER_NO`) REFERENCES `t_user` (`USER_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='서비스이용';

-- 테이블 데이터 kickboard_svc.t_svc_use:~105 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_svc_use` DISABLE KEYS */;
INSERT INTO `t_svc_use` (`USE_NO`, `USER_NO`, `MACHINE_NO`, `CHARGE_NO`, `USE_START_DT`, `USE_END_DT`, `USE_DISTANCE`, `USE_TIME`, `USE_CHARGE`, `EARNED_POINT`) VALUES
	('US22000001', 'ME00001', 'DE00004', 'CO00001', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 8 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 8 DAY), '%Y-%m-%d'),' 14:30:00'), 1200, 30, 1500, 15),
	('US22000002', 'ME00001', 'DE00005', 'CO00002', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 12 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 12 DAY), '%Y-%m-%d'),' 14:20:00'), 2000, 20, 3000, 30),
	('US22000003', 'ME00001', 'DE00002', 'CO00002', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 24 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 24 DAY), '%Y-%m-%d'),' 14:40:00'), 3200, 40, 4500, 45),
	('US22000004', 'ME00001', 'DE00003', 'CO00001', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 38 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 38 DAY), '%Y-%m-%d'),' 14:40:00'), 3800, 40, 6000, 60),
	('US22000005', 'ME00001', 'DE00004', 'CO00002', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 46 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 46 DAY), '%Y-%m-%d'),' 14:10:00'), 1300, 10, 1500, 15),
	('US22000006', 'ME00001', 'DE00005', 'CO00001', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 51 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 51 DAY), '%Y-%m-%d'),' 14:20:00'), 2600, 20, 3000, 30),
	('US22000007', 'ME00001', 'DE00001', 'CO00002', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 63 DAY), '%Y-%m-%d'),' 14:00:00'), CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 63 DAY), '%Y-%m-%d'),' 14:30:00'), 3700, 30, 4500, 45);
/*!40000 ALTER TABLE `t_svc_use` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_svc_use_pay 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_svc_use_pay` (
  `SVC_USE_PAY_NO` varchar(20) NOT NULL COMMENT '서비스이용결제번호',
  `USE_NO` varchar(20) NOT NULL COMMENT '서비스이용번호',
  `PAY_DATETIME` datetime NOT NULL COMMENT '결제일시',
  `PAY_COST` bigint(12) NOT NULL DEFAULT 0 COMMENT '결제금액',
  `PAYMETHOD_CODE` varchar(3) NOT NULL DEFAULT '0' COMMENT '결제수단코드',
  PRIMARY KEY (`SVC_USE_PAY_NO`),
  KEY `FK__t_svc_use` (`USE_NO`),
  CONSTRAINT `FK__t_svc_use` FOREIGN KEY (`USE_NO`) REFERENCES `t_svc_use` (`USE_NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='서비스이용결제';

-- 테이블 데이터 kickboard_svc.t_svc_use_pay:~198 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_svc_use_pay` DISABLE KEYS */;
	INSERT INTO `t_svc_use_pay` (`SVC_USE_PAY_NO`, `USE_NO`, `PAY_DATETIME`, `PAY_COST`, `PAYMETHOD_CODE`) VALUES
	('PA2200000000001', 'US22000001', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 8 DAY), '%Y-%m-%d'),' 14:35:00'), 1500, 'C'),
	('PA2200000000003', 'US22000002', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 12 DAY), '%Y-%m-%d'),' 14:25:00'), 3000, 'C'),
	('PA2200000000005', 'US22000003', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 24 DAY), '%Y-%m-%d'),' 14:45:00'), 3900, 'C'),
	('PA2200000000006', 'US22000003', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 24 DAY), '%Y-%m-%d'),' 14:45:00'), 600, 'P'),
	('PA2200000000007', 'US22000004', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 38 DAY), '%Y-%m-%d'),' 14:45:00'), 4800, 'C'),
	('PA2200000000008', 'US22000004', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 38 DAY), '%Y-%m-%d'),' 14:45:00'), 1200, 'P'),
	('PA2200000000009', 'US22000005', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 46 DAY), '%Y-%m-%d'),' 14:15:00'), 1100, 'C'),
	('PA2200000000010', 'US22000005', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 46 DAY), '%Y-%m-%d'),' 14:15:00'), 400, 'P'),
	('PA2200000000011', 'US22000006', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 51 DAY), '%Y-%m-%d'),' 14:25:00'), 3000, 'C'),
	('PA2200000000014', 'US22000007', CONCAT(DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 63 DAY), '%Y-%m-%d'),' 14:35:00'), 4500, 'P');
/*!40000 ALTER TABLE `t_svc_use_pay` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_user` (
  `USER_NO` varchar(20) NOT NULL COMMENT '회원번호',
  `NAME` varchar(20) NOT NULL COMMENT '이름',
  `BIRTHDAY` date DEFAULT NULL COMMENT '생년월일',
  `CALL_NUMBER` varchar(20) DEFAULT '' COMMENT '전화번호',
  `EMAIL` varchar(30) DEFAULT '' COMMENT '이메일',
  `HP_NUMBER` varchar(12) DEFAULT '' COMMENT '휴대폰번호',
  `DRIVE_LICENSE` varchar(1) DEFAULT 'x' COMMENT '운전면허증보유여부',
  `USER_CODE` varchar(3) DEFAULT NULL COMMENT '일반, 관리자',
  PRIMARY KEY (`USER_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='회원\r\n';

-- 테이블 데이터 kickboard_svc.t_user:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` (`USER_NO`, `NAME`, `BIRTHDAY`, `CALL_NUMBER`, `EMAIL`, `HP_NUMBER`, `DRIVE_LICENSE`, `USER_CODE`) VALUES
	('ME00001', '김아무개', NULL, '', '', '', 'x', 'GEN'),
	('ME00002', '최아무개', NULL, '', '', '', 'x', 'GEN'),
	('ME00003', '박아무개', NULL, '', '', '', 'x', 'GEN'),
	('ME00004', '이아무개', NULL, '', '', '', 'x', 'GEN'),
	('ME00005', '홍아무개', NULL, '', '', '', 'x', 'GEN');
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;

-- 테이블 kickboard_svc.t_use_cost 구조 내보내기
CREATE TABLE IF NOT EXISTS `t_use_cost` (
  `CHARGE_NO` varchar(20) NOT NULL DEFAULT '' COMMENT '이용요금번호',
  `BASIC_COST` int(12) DEFAULT NULL COMMENT '기본요금',
  `BASIC_USE_TIME` int(11) DEFAULT NULL COMMENT '기본요금시간',
  `ADD_COST` int(11) DEFAULT NULL COMMENT '추가이용요금',
  `ADD_USETIME_UNIT` int(11) DEFAULT NULL COMMENT '추가이용단위시간',
  `VALID_START_DT` datetime NOT NULL COMMENT '유효시작일자',
  `VALID_END_DT` datetime NOT NULL COMMENT '유효종료일자',
  PRIMARY KEY (`CHARGE_NO`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='이용요금';

-- 테이블 데이터 kickboard_svc.t_use_cost:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `t_use_cost` DISABLE KEYS */;
INSERT INTO `t_use_cost` (`CHARGE_NO`, `BASIC_COST`, `BASIC_USE_TIME`, `ADD_COST`, `ADD_USETIME_UNIT`, `VALID_START_DT`, `VALID_END_DT`) VALUES
	('CO00001', 1000, 15, 1000, 5, '2021-12-30 00:00:00', '2022-12-30 00:00:00'),
	('CO00002', 1500, 15, 1000, 5, '2021-12-30 00:00:00', '2022-12-30 00:00:00'),
	('CO00003', 2000, 15, 700, 5, '2021-12-30 00:00:00', '2022-12-30 00:00:00'),
	('CO00004', 2500, 15, 500, 5, '2021-12-30 00:00:00', '2022-12-30 00:00:00'),
	('CO00005', 3000, 15, 500, 5, '2021-12-30 00:00:00', '2022-12-30 00:00:00');
/*!40000 ALTER TABLE `t_use_cost` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
