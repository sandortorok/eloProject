-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: eloRatingDB
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `eloRatingDB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `eloRatingDB` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `eloRatingDB`;

--
-- Table structure for table `DEMatches`
--

DROP TABLE IF EXISTS `DEMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `DEMatches` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `gameName` varchar(100) DEFAULT NULL,
  `winner` varchar(100) DEFAULT NULL,
  `loser` tinyint(1) DEFAULT NULL,
  `player1` varchar(100) DEFAULT NULL,
  `player2` varchar(100) DEFAULT NULL,
  `round` int DEFAULT NULL,
  `bye` tinyint(1) DEFAULT NULL,
  `score1` int DEFAULT NULL,
  `score2` int DEFAULT NULL,
  `gameType` varchar(100) DEFAULT NULL,
  `bottom` tinyint(1) DEFAULT NULL,
  `nextMatch_ID` int DEFAULT NULL,
  `nextLoseMatch_ID` int DEFAULT NULL,
  `match_ID` int DEFAULT NULL,
  `final` tinyint(1) DEFAULT NULL,
  `loserFrom1` int DEFAULT NULL,
  `loserFrom2` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_idx` (`gameName`,`match_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2757 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEMatches`
--

LOCK TABLES `DEMatches` WRITE;
/*!40000 ALTER TABLE `DEMatches` DISABLE KEYS */;
INSERT INTO `DEMatches` VALUES (2726,'mokk2','Játékos 9',0,'Játékos 9','',1,1,1,NULL,'dekázás',0,8,NULL,0,0,-1,-1),(2727,'mokk2','Játékos 10',0,'Játékos 10','',1,1,1,NULL,'dekázás',1,8,NULL,1,0,-1,-1),(2728,'mokk2','Játékos 6',0,'Játékos 6','',1,1,1,NULL,'dekázás',0,9,NULL,2,0,-1,-1),(2729,'mokk2','Játékos 1',0,'Játékos 1','',1,1,1,NULL,'dekázás',1,9,NULL,3,0,-1,-1),(2730,'mokk2','Játékos 2',0,'Játékos 2','',1,1,1,NULL,'dekázás',0,10,NULL,4,0,-1,-1),(2731,'mokk2','Játékos 4',0,'Játékos 4','',1,1,1,NULL,'dekázás',1,10,NULL,5,0,-1,-1),(2732,'mokk2','',0,'Játékos 5','Játékos 7',1,0,NULL,NULL,'dekázás',0,11,NULL,6,0,-1,-1),(2733,'mokk2','',0,'Játékos 8','Játékos 3',1,0,NULL,NULL,'dekázás',1,11,NULL,7,0,-1,-1),(2734,'mokk2','Játékos 9',0,'Játékos 9','Játékos 10',2,0,NULL,NULL,'dekázás',0,12,NULL,8,0,-1,-1),(2735,'mokk2','',0,'Játékos 6','Játékos 1',2,0,NULL,NULL,'dekázás',1,12,NULL,9,0,-1,-1),(2736,'mokk2','Játékos 2',0,'Játékos 2','Játékos 4',2,0,NULL,NULL,'dekázás',0,13,NULL,10,0,-1,-1),(2737,'mokk2','',0,'','',2,0,NULL,NULL,'dekázás',1,13,NULL,11,0,-1,-1),(2738,'mokk2','',0,'Játékos 9','',3,0,NULL,NULL,'dekázás',0,14,NULL,12,0,-1,-1),(2739,'mokk2','',0,'Játékos 2','',3,0,NULL,NULL,'dekázás',1,14,NULL,13,0,-1,-1),(2740,'mokk2','',0,'','',4,0,NULL,NULL,'dekázás',0,29,NULL,14,0,-1,-1),(2741,'mokk2','',1,'','',1,1,NULL,NULL,'dekázás',0,19,NULL,15,0,-1,-1),(2742,'mokk2','',1,'','',1,1,NULL,NULL,'dekázás',1,20,NULL,16,0,-1,-1),(2743,'mokk2','',1,'','',1,1,NULL,NULL,'dekázás',1,21,NULL,17,0,-1,-1),(2744,'mokk2','',1,'Loser of 6','Loser of 7',1,0,NULL,NULL,'dekázás',1,22,NULL,18,0,6,7),(2745,'mokk2','Loser of 11',1,'Loser of 11','',2,0,NULL,NULL,'dekázás',0,23,NULL,19,0,11,-1),(2746,'mokk2','Játékos 4',1,'Játékos 4','',2,0,NULL,NULL,'dekázás',1,23,NULL,20,0,10,-1),(2747,'mokk2','Loser of 9',1,'Loser of 9','',2,0,NULL,NULL,'dekázás',0,24,NULL,21,0,9,-1),(2748,'mokk2','',1,'Játékos 10','',2,0,NULL,NULL,'dekázás',1,24,NULL,22,0,8,-1),(2749,'mokk2','',1,'Loser of 11','Játékos 4',3,0,NULL,NULL,'dekázás',0,25,NULL,23,0,11,10),(2750,'mokk2','',1,'Loser of 9','',3,0,NULL,NULL,'dekázás',1,26,NULL,24,0,9,-1),(2751,'mokk2','',1,'Loser of 13','',4,0,NULL,NULL,'dekázás',0,27,NULL,25,0,13,-1),(2752,'mokk2','',1,'Loser of 12','',4,0,NULL,NULL,'dekázás',1,27,NULL,26,0,12,-1),(2753,'mokk2','',1,'','',5,0,NULL,NULL,'dekázás',0,28,NULL,27,0,-1,-1),(2754,'mokk2','',1,'Loser of 14','',6,0,NULL,NULL,'dekázás',1,29,NULL,28,0,14,-1),(2755,'mokk2','',0,'Winner of Winner\'s Bracket','Winner of Loser\'s Bracket',7,0,NULL,NULL,'dekázás',0,30,NULL,29,1,-1,-1),(2756,'mokk2','',0,'Winner of 29 (if needed)','Loser of 29',8,0,NULL,NULL,'dekázás',0,-1,NULL,30,1,-1,29);
/*!40000 ALTER TABLE `DEMatches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SEMatches`
--

DROP TABLE IF EXISTS `SEMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `SEMatches` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `gameName` varchar(100) DEFAULT NULL,
  `winner` varchar(100) DEFAULT NULL,
  `player1` varchar(100) DEFAULT NULL,
  `player2` varchar(100) DEFAULT NULL,
  `round` int DEFAULT NULL,
  `bye` tinyint(1) DEFAULT NULL,
  `score1` int DEFAULT NULL,
  `score2` int DEFAULT NULL,
  `gameType` varchar(100) DEFAULT NULL,
  `bottom` tinyint(1) DEFAULT NULL,
  `nextMatch_ID` int DEFAULT NULL,
  `match_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_index` (`gameName`,`match_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SEMatches`
--

LOCK TABLES `SEMatches` WRITE;
/*!40000 ALTER TABLE `SEMatches` DISABLE KEYS */;
INSERT INTO `SEMatches` VALUES (350,'biba8','Játékos 5','Játékos 5','',1,1,1,NULL,'sakk',0,8,0),(351,'biba8','Játékos 2','Játékos 2','',1,1,1,NULL,'sakk',1,8,1),(352,'biba8','Játékos 7','Játékos 7','',1,1,1,NULL,'sakk',0,9,2),(353,'biba8','Játékos 4','Játékos 4','',1,1,1,NULL,'sakk',1,9,3),(354,'biba8','Játékos 10','Játékos 10','',1,1,1,NULL,'sakk',0,10,4),(355,'biba8','Játékos 9','Játékos 9','',1,1,1,NULL,'sakk',1,10,5),(356,'biba8','Játékos 1','Játékos 1','Játékos 3',1,0,NULL,NULL,'sakk',0,11,6),(357,'biba8','Játékos 8','Játékos 8','Játékos 6',1,0,NULL,NULL,'sakk',1,11,7),(358,'biba8','Játékos 2','Játékos 5','Játékos 2',2,0,NULL,NULL,'sakk',0,12,8),(359,'biba8','Játékos 7','Játékos 7','Játékos 4',2,0,NULL,NULL,'sakk',1,12,9),(360,'biba8','Játékos 10','Játékos 10','Játékos 9',2,0,NULL,NULL,'sakk',0,13,10),(361,'biba8','Játékos 8','Játékos 1','Játékos 8',2,0,NULL,NULL,'sakk',1,13,11),(362,'biba8','Játékos 7','Játékos 2','Játékos 7',3,0,NULL,NULL,'sakk',0,14,12),(363,'biba8','Játékos 10','Játékos 10','Játékos 8',3,0,NULL,NULL,'sakk',1,14,13),(364,'biba8','Játékos 10','Játékos 7','Játékos 10',4,0,NULL,NULL,'sakk',0,-1,14);
/*!40000 ALTER TABLE `SEMatches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `gameName` varchar(100) NOT NULL,
  `gameType` varchar(100) NOT NULL,
  `bracketType` varchar(255) DEFAULT NULL,
  `lastSaved` datetime DEFAULT NULL,
  PRIMARY KEY (`gameName`,`gameType`),
  UNIQUE KEY `unique_index` (`gameType`,`bracketType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('biba8','sakk','single-elimination','2022-06-28 13:41:23'),('mokk2','dekázás','double-elimination','2022-06-28 13:35:30');
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chessGames`
--

DROP TABLE IF EXISTS `chessGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `chessGames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name1` varchar(255) DEFAULT NULL,
  `name2` varchar(255) DEFAULT NULL,
  `p1Win` double DEFAULT NULL,
  `p1Gain` double DEFAULT NULL,
  `p2Gain` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chessGames`
--

LOCK TABLES `chessGames` WRITE;
/*!40000 ALTER TABLE `chessGames` DISABLE KEYS */;
INSERT INTO `chessGames` VALUES (1,'ifj. Török Sándor','Török Máté',0.5,-12.219304718558988,12.219304718558988),(2,'ifj. Török Sándor','Török Máté',0,-58.86015130670762,58.86015130670762),(3,'Török Máté','ifj. Török Sándor',0,-57.9193967285064,57.9193967285064),(4,'Török Dániel','Török Dorotea',1,50,-50),(5,'Török Máté','Török Dorotea',1,47.149469267027825,-47.149469267027825),(6,'Török Dorotea','Török Dániel',1,69.9950138498782,-69.9950138498782),(7,'ifj. Török Sándor','Török Dániel',0.5,-7.169710901228086,7.169710901228086),(8,'ifj. Török Sándor','Török Máté',0,-50.86666152622968,50.866661526229564),(9,'ifj. Török Sándor','Török Máté',1,63.43569326161946,-63.43569326161946),(10,'ifj. Török Sándor','Török Dorotea',1,41.069991195892726,-41.069991195892726),(11,'ifj. Török Sándor','Török Dániel',0,-62.59791164975843,62.59791164975843),(12,'ifj. Török Sándor','Török Máté',1,48.61406543471219,-48.614065434712074),(13,'Török Dorotea','Török Máté',1,53.45123558068292,-53.45123558068292),(14,'ifj. Török Sándor','Török Dániel',1,48.146715893852615,-48.146715893852615),(15,'ifj. Török Sándor','Török Dániel',0,-65.2143568333986,65.21435683339871),(16,'Török Máté','ifj. Török Sándor',0,-30.479178788153945,30.47917878815406);
/*!40000 ALTER TABLE `chessGames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chessPlayers`
--

DROP TABLE IF EXISTS `chessPlayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `chessPlayers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `games` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chessPlayers`
--

LOCK TABLES `chessPlayers` WRITE;
/*!40000 ALTER TABLE `chessPlayers` DISABLE KEYS */;
INSERT INTO `chessPlayers` VALUES (1,'ifj. Török Sándor',1076.067985901835,19),(2,'Török Máté',871.8649754898701,16),(3,'Török Dániel',1066.8402496406543,6),(4,'Török Dorotea',985.2267889676406,5),(5,'Török Sándor',1000,0);
/*!40000 ALTER TABLE `chessPlayers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klaskGames`
--

DROP TABLE IF EXISTS `klaskGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `klaskGames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name1` varchar(255) DEFAULT NULL,
  `name2` varchar(255) DEFAULT NULL,
  `p1Win` double DEFAULT NULL,
  `p1Gain` double DEFAULT NULL,
  `p2Gain` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klaskGames`
--

LOCK TABLES `klaskGames` WRITE;
/*!40000 ALTER TABLE `klaskGames` DISABLE KEYS */;
INSERT INTO `klaskGames` VALUES (1,'ifj. Török Sándor','player2',0.5,-14.006499980288481,14.006499980288481);
/*!40000 ALTER TABLE `klaskGames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klaskPlayers`
--

DROP TABLE IF EXISTS `klaskPlayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `klaskPlayers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `games` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klaskPlayers`
--

LOCK TABLES `klaskPlayers` WRITE;
/*!40000 ALTER TABLE `klaskPlayers` DISABLE KEYS */;
INSERT INTO `klaskPlayers` VALUES (1,'ifj. Török Sándor',1035.9935000197115,2),(2,'player2',964.0064999802885,2),(3,'player3',1000,0),(4,'player4',1000,0),(5,'player5',1000,0);
/*!40000 ALTER TABLE `klaskPlayers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pingpongGames`
--

DROP TABLE IF EXISTS `pingpongGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `pingpongGames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name1` varchar(255) DEFAULT NULL,
  `name2` varchar(255) DEFAULT NULL,
  `p1Win` double DEFAULT NULL,
  `p1Gain` double DEFAULT NULL,
  `p2Gain` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pingpongGames`
--

LOCK TABLES `pingpongGames` WRITE;
/*!40000 ALTER TABLE `pingpongGames` DISABLE KEYS */;
INSERT INTO `pingpongGames` VALUES (1,'Ping-Pong Mester','player3',1,50,-50),(2,'Ping-Pong Mester','player2',1,42.8536882591618,-42.8536882591618),(3,'Ping-Pong Mester','player6',1,36.946589830164385,-36.94658983016461),(4,'Ping-Pong Mester','player6',1,27.690379712270442,-27.690379712270442),(5,'Ping-Pong Mester','player6',1,21.777680478197908,-21.777680478197908),(6,'Ping-Pong Mester','player6',1,17.808233580113892,-17.808233580113892),(7,'Ping-Pong Mester','player6',1,15.002320248830529,-15.002320248830529),(8,'Ping-Pong Mester','player6',1,12.930253519386724,-12.930253519386724),(9,'Ping-Pong Mester','player6',1,11.344704177723543,-11.344704177723543),(10,'Ping-Pong Mester','player6',1,10.095888070539331,-10.095888070539331),(11,'Ping-Pong Mester','player6',1,9.088731028247139,-9.088731028247139),(12,'Ping-Pong Mester','player6',1,8.26035882552469,-8.26035882552469),(13,'Ping-Pong Mester','player6',1,7.567698943228834,-7.567698943228834),(14,'Ping-Pong Mester','player6',1,6.98033638484867,-6.98033638484867),(15,'Ping-Pong Mester','player6',0,-93.52377493091944,93.52377493091944),(16,'Ping-Pong Mester','player6',0,-83.10862908950003,83.10862908950003),(17,'Ping-Pong Mester','player6',0,-65.3966874256987,65.3966874256987),(18,'Ping-Pong Mester','player6',1,52.90634505044318,-52.90634505044318),(19,'Ping-Pong Mester','player6',1,37.92525890012507,-37.92525890012507),(20,'Ping-Pong Mester','player5',1,32.477120440997396,-32.477120440997396),(21,'Ping-Pong Mester','player4',1,28.51853465746126,-28.518534657461487),(22,'Ping-Pong Mester','ifj. Török Sándor',0,-74.70707065068882,74.70707065068905),(23,'Ping-Pong Mester','ifj. Török Sándor',0,-55.55084858920941,55.55084858920941),(24,'Ping-Pong Mester','ifj. Török Sándor',0,-39.73306598180943,39.73306598180943),(25,'player3','ifj. Török Sándor',0,-21.98792972482181,21.987929724821697),(26,'Ping-Pong Mester','ifj. Török Sándor',1,73.1179749680482,-73.1179749680482),(27,'Ping-Pong Mester','ifj. Török Sándor',1,53.962040608869984,-53.962040608869984);
/*!40000 ALTER TABLE `pingpongGames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pingpongPlayers`
--

DROP TABLE IF EXISTS `pingpongPlayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `pingpongPlayers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `games` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pingpongPlayers`
--

LOCK TABLES `pingpongPlayers` WRITE;
/*!40000 ALTER TABLE `pingpongPlayers` DISABLE KEYS */;
INSERT INTO `pingpongPlayers` VALUES (1,'ifj. Török Sándor',1064.8988993696114,6),(2,'player2',957.1463117408382,1),(3,'player3',928.0120702751782,2),(4,'player4',971.4814653425385,1),(5,'player5',967.5228795590026,1),(6,'player6',965.7043126964736,17),(7,'Ping-Pong Mester',1145.2340610163571,26);
/*!40000 ALTER TABLE `pingpongPlayers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volleyBallGames`
--

DROP TABLE IF EXISTS `volleyBallGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `volleyBallGames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name1` varchar(255) DEFAULT NULL,
  `name2` varchar(255) DEFAULT NULL,
  `p1Win` double DEFAULT NULL,
  `score1` varchar(255) DEFAULT NULL,
  `score2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volleyBallGames`
--

LOCK TABLES `volleyBallGames` WRITE;
/*!40000 ALTER TABLE `volleyBallGames` DISABLE KEYS */;
/*!40000 ALTER TABLE `volleyBallGames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volleyballTeams`
--

DROP TABLE IF EXISTS `volleyballTeams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `volleyballTeams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name1` varchar(255) DEFAULT NULL,
  `name2` varchar(255) DEFAULT NULL,
  `name3` varchar(255) DEFAULT NULL,
  `name4` varchar(255) DEFAULT NULL,
  `name5` varchar(255) DEFAULT NULL,
  `name6` varchar(255) DEFAULT NULL,
  `name7` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `games` int DEFAULT NULL,
  `teamName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volleyballTeams`
--

LOCK TABLES `volleyballTeams` WRITE;
/*!40000 ALTER TABLE `volleyballTeams` DISABLE KEYS */;
INSERT INTO `volleyballTeams` VALUES (1,'p1','p2','p3','p4','p5','p6','p7',1000,0,'csapat1'),(2,'p21','p22','p23','p24','p25','p26','p27',1000,0,'csapat2'),(3,'p31','p32','p33','p34','p35','p36','p37',1000,0,'csapat3');
/*!40000 ALTER TABLE `volleyballTeams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-29  8:35:36
