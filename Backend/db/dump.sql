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
  `match_ID` int DEFAULT NULL,
  `final` tinyint(1) DEFAULT NULL,
  `loserFrom1` int DEFAULT NULL,
  `loserFrom2` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_idx` (`gameName`,`match_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3284 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEMatches`
--

LOCK TABLES `DEMatches` WRITE;
/*!40000 ALTER TABLE `DEMatches` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEMatches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RRMatches`
--

DROP TABLE IF EXISTS `RRMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `RRMatches` (
  `gameName` varchar(100) NOT NULL,
  `winner` varchar(100) DEFAULT NULL,
  `match_ID` int NOT NULL,
  `gameType` varchar(255) DEFAULT NULL,
  `round` int DEFAULT NULL,
  `bye` tinyint(1) DEFAULT NULL,
  `player1` varchar(100) DEFAULT NULL,
  `player2` varchar(100) DEFAULT NULL,
  `groupMode` tinyint(1) NOT NULL DEFAULT '0',
  `groupName` varchar(100) DEFAULT NULL,
  `score1` int DEFAULT NULL,
  `score2` int DEFAULT NULL,
  PRIMARY KEY (`gameName`,`match_ID`),
  UNIQUE KEY `unique_index` (`gameName`,`match_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RRMatches`
--

LOCK TABLES `RRMatches` WRITE;
/*!40000 ALTER TABLE `RRMatches` DISABLE KEYS */;
INSERT INTO `RRMatches` VALUES ('csop1','Játékos 6',0,'csocsó',1,0,'Játékos 6','Játékos 16',1,'A Csoport',5,0),('csop1','Játékos 5',1,'csocsó',1,0,'Játékos 7','Játékos 5',1,'A Csoport',0,3),('csop1','Játékos 6',2,'csocsó',2,0,'Játékos 6','Játékos 7',1,'A Csoport',2,0),('csop1','',3,'csocsó',2,0,'Játékos 5','Játékos 16',1,'A Csoport',NULL,NULL),('csop1','',4,'csocsó',3,0,'Játékos 6','Játékos 5',1,'A Csoport',NULL,NULL),('csop1','',5,'csocsó',3,0,'Játékos 16','Játékos 7',1,'A Csoport',NULL,NULL),('csop1','',6,'csocsó',1,0,'Játékos 14','Játékos 19',1,'B Csoport',NULL,NULL),('csop1','',7,'csocsó',1,0,'Játékos 18','Játékos 11',1,'B Csoport',NULL,NULL),('csop1','',8,'csocsó',2,0,'Játékos 14','Játékos 18',1,'B Csoport',NULL,NULL),('csop1','',9,'csocsó',2,0,'Játékos 11','Játékos 19',1,'B Csoport',NULL,NULL),('csop1','',10,'csocsó',3,0,'Játékos 14','Játékos 11',1,'B Csoport',NULL,NULL),('csop1','',11,'csocsó',3,0,'Játékos 19','Játékos 18',1,'B Csoport',NULL,NULL),('csop1','',12,'csocsó',1,0,'Játékos 9','Játékos 8',1,'C Csoport',NULL,NULL),('csop1','',13,'csocsó',1,0,'Játékos 3','Játékos 4',1,'C Csoport',NULL,NULL),('csop1','',14,'csocsó',2,0,'Játékos 9','Játékos 3',1,'C Csoport',NULL,NULL),('csop1','',15,'csocsó',2,0,'Játékos 4','Játékos 8',1,'C Csoport',NULL,NULL),('csop1','',16,'csocsó',3,0,'Játékos 9','Játékos 4',1,'C Csoport',NULL,NULL),('csop1','',17,'csocsó',3,0,'Játékos 8','Játékos 3',1,'C Csoport',NULL,NULL),('csop1','',18,'csocsó',1,0,'Játékos 17','Játékos 2',1,'D Csoport',NULL,NULL),('csop1','',19,'csocsó',1,0,'Játékos 12','Játékos 13',1,'D Csoport',NULL,NULL),('csop1','',20,'csocsó',2,0,'Játékos 17','Játékos 12',1,'D Csoport',NULL,NULL),('csop1','',21,'csocsó',2,0,'Játékos 13','Játékos 2',1,'D Csoport',NULL,NULL),('csop1','',22,'csocsó',3,0,'Játékos 17','Játékos 13',1,'D Csoport',NULL,NULL),('csop1','',23,'csocsó',3,0,'Játékos 2','Játékos 12',1,'D Csoport',NULL,NULL),('csop1','',24,'csocsó',1,0,'Játékos 15','Játékos 20',1,'E Csoport',NULL,NULL),('csop1','',25,'csocsó',1,0,'Játékos 1','Játékos 10',1,'E Csoport',NULL,NULL),('csop1','',26,'csocsó',2,0,'Játékos 15','Játékos 1',1,'E Csoport',NULL,NULL),('csop1','',27,'csocsó',2,0,'Játékos 10','Játékos 20',1,'E Csoport',NULL,NULL),('csop1','',28,'csocsó',3,0,'Játékos 15','Játékos 10',1,'E Csoport',NULL,NULL),('csop1','',29,'csocsó',3,0,'Játékos 20','Játékos 1',1,'E Csoport',NULL,NULL),('thopz','',0,'csocsó',1,0,'Játékos 6','Játékos 16',1,'A Csoport',NULL,NULL),('thopz','',1,'csocsó',1,0,'Játékos 7','Játékos 5',1,'A Csoport',NULL,NULL),('thopz','',2,'csocsó',2,0,'Játékos 6','Játékos 7',1,'A Csoport',NULL,NULL),('thopz','',3,'csocsó',2,0,'Játékos 5','Játékos 16',1,'A Csoport',NULL,NULL),('thopz','',4,'csocsó',3,0,'Játékos 6','Játékos 5',1,'A Csoport',NULL,NULL),('thopz','',5,'csocsó',3,0,'Játékos 16','Játékos 7',1,'A Csoport',NULL,NULL),('thopz','',6,'csocsó',1,0,'Játékos 14','Játékos 19',1,'B Csoport',NULL,NULL),('thopz','',7,'csocsó',1,0,'Játékos 18','Játékos 11',1,'B Csoport',NULL,NULL),('thopz','',8,'csocsó',2,0,'Játékos 14','Játékos 18',1,'B Csoport',NULL,NULL),('thopz','',9,'csocsó',2,0,'Játékos 11','Játékos 19',1,'B Csoport',NULL,NULL),('thopz','',10,'csocsó',3,0,'Játékos 14','Játékos 11',1,'B Csoport',NULL,NULL),('thopz','',11,'csocsó',3,0,'Játékos 19','Játékos 18',1,'B Csoport',NULL,NULL),('thopz','',12,'csocsó',1,0,'Játékos 9','Játékos 8',1,'C Csoport',NULL,NULL),('thopz','',13,'csocsó',1,0,'Játékos 3','Játékos 4',1,'C Csoport',NULL,NULL),('thopz','',14,'csocsó',2,0,'Játékos 9','Játékos 3',1,'C Csoport',NULL,NULL),('thopz','',15,'csocsó',2,0,'Játékos 4','Játékos 8',1,'C Csoport',NULL,NULL),('thopz','',16,'csocsó',3,0,'Játékos 9','Játékos 4',1,'C Csoport',NULL,NULL),('thopz','',17,'csocsó',3,0,'Játékos 8','Játékos 3',1,'C Csoport',NULL,NULL),('thopz','',18,'csocsó',1,0,'Játékos 17','Játékos 2',1,'D Csoport',NULL,NULL),('thopz','',19,'csocsó',1,0,'Játékos 12','Játékos 13',1,'D Csoport',NULL,NULL),('thopz','',20,'csocsó',2,0,'Játékos 17','Játékos 12',1,'D Csoport',NULL,NULL),('thopz','',21,'csocsó',2,0,'Játékos 13','Játékos 2',1,'D Csoport',NULL,NULL),('thopz','',22,'csocsó',3,0,'Játékos 17','Játékos 13',1,'D Csoport',NULL,NULL),('thopz','',23,'csocsó',3,0,'Játékos 2','Játékos 12',1,'D Csoport',NULL,NULL),('thopz','',24,'csocsó',1,0,'Játékos 15','Játékos 20',1,'E Csoport',NULL,NULL),('thopz','',25,'csocsó',1,0,'Játékos 1','Játékos 10',1,'E Csoport',NULL,NULL),('thopz','',26,'csocsó',2,0,'Játékos 15','Játékos 1',1,'E Csoport',NULL,NULL),('thopz','',27,'csocsó',2,0,'Játékos 10','Játékos 20',1,'E Csoport',NULL,NULL),('thopz','',28,'csocsó',3,0,'Játékos 15','Játékos 10',1,'E Csoport',NULL,NULL),('thopz','',29,'csocsó',3,0,'Játékos 20','Játékos 1',1,'E Csoport',NULL,NULL);
/*!40000 ALTER TABLE `RRMatches` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=633 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SEMatches`
--

LOCK TABLES `SEMatches` WRITE;
/*!40000 ALTER TABLE `SEMatches` DISABLE KEYS */;
INSERT INTO `SEMatches` VALUES (618,'ymm9c','Játékos 2','Játékos 2','',1,1,1,NULL,'ping-pong-páros',0,8,0),(619,'ymm9c','Játékos 3','Játékos 3','',1,1,1,NULL,'ping-pong-páros',1,8,1),(620,'ymm9c','Játékos 6','Játékos 6','',1,1,1,NULL,'ping-pong-páros',0,9,2),(621,'ymm9c','Játékos 9','Játékos 9','',1,1,1,NULL,'ping-pong-páros',1,9,3),(622,'ymm9c','Játékos 1','Játékos 1','',1,1,1,NULL,'ping-pong-páros',0,10,4),(623,'ymm9c','Játékos 7','Játékos 7','',1,1,1,NULL,'ping-pong-páros',1,10,5),(624,'ymm9c','','Játékos 8','Játékos 10',1,0,NULL,NULL,'ping-pong-páros',0,11,6),(625,'ymm9c','','Játékos 5','Játékos 4',1,0,NULL,NULL,'ping-pong-páros',1,11,7),(626,'ymm9c','','Játékos 2','Játékos 3',2,0,NULL,NULL,'ping-pong-páros',0,12,8),(627,'ymm9c','','Játékos 6','Játékos 9',2,0,NULL,NULL,'ping-pong-páros',1,12,9),(628,'ymm9c','','Játékos 1','Játékos 7',2,0,NULL,NULL,'ping-pong-páros',0,13,10),(629,'ymm9c','','','',2,0,NULL,NULL,'ping-pong-páros',1,13,11),(630,'ymm9c','','','',3,0,NULL,NULL,'ping-pong-páros',0,14,12),(631,'ymm9c','','','',3,0,NULL,NULL,'ping-pong-páros',1,14,13),(632,'ymm9c','','','',4,0,NULL,NULL,'ping-pong-páros',0,-1,14);
/*!40000 ALTER TABLE `SEMatches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SWMatches`
--

DROP TABLE IF EXISTS `SWMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `SWMatches` (
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SWMatches`
--

LOCK TABLES `SWMatches` WRITE;
/*!40000 ALTER TABLE `SWMatches` DISABLE KEYS */;
INSERT INTO `SWMatches` VALUES (1,'l5der','','Játékos 5','Játékos 4',1,0,NULL,NULL,'sakk',0,-1,0),(2,'l5der','','Játékos 6','Játékos 2',1,0,NULL,NULL,'sakk',0,-1,1),(3,'l5der','','Játékos 7','Játékos 10',1,0,NULL,NULL,'sakk',0,-1,2),(4,'l5der','','Játékos 3','Játékos 1',1,0,NULL,NULL,'sakk',0,-1,3),(5,'l5der','','Játékos 8','Játékos 9',1,0,NULL,NULL,'sakk',0,-1,4),(6,'y3mm1','','Játékos 10','Játékos 4',1,0,NULL,NULL,'sakk',0,-1,0),(7,'y3mm1','','Játékos 5','Játékos 2',1,0,NULL,NULL,'sakk',0,-1,1),(8,'y3mm1','','Játékos 1','Játékos 6',1,0,NULL,NULL,'sakk',0,-1,2),(9,'y3mm1','','Játékos 9','Játékos 7',1,0,NULL,NULL,'sakk',0,-1,3),(10,'y3mm1','','Játékos 8','Játékos 3',1,0,NULL,NULL,'sakk',0,-1,4),(16,'swiss_test1','Játékos 5','Játékos 5','Játékos 4',1,0,1,0,'sakk',0,-1,0),(17,'swiss_test1','','Játékos 6','Játékos 2',1,0,NULL,NULL,'sakk',0,-1,1),(18,'swiss_test1','','Játékos 7','Játékos 10',1,0,NULL,NULL,'sakk',0,-1,2),(19,'swiss_test1','','Játékos 3','Játékos 1',1,0,NULL,NULL,'sakk',0,-1,3),(20,'swiss_test1','','Játékos 8','Játékos 9',1,0,NULL,NULL,'sakk',0,-1,4);
/*!40000 ALTER TABLE `SWMatches` ENABLE KEYS */;
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
INSERT INTO `cache` VALUES ('csop1','csocsó','group-stage','2022-07-13 14:53:59'),('swiss_test1','sakk','swiss','2022-07-13 15:36:04'),('ymm9c','ping-pong-páros','single-elimination','2022-07-13 12:53:21');
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eloGames`
--

DROP TABLE IF EXISTS `eloGames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `eloGames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name1` varchar(100) NOT NULL,
  `name2` varchar(100) NOT NULL,
  `p1Win` double NOT NULL,
  `p1Gain` double NOT NULL,
  `p2Gain` double NOT NULL,
  `gameType` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eloGames`
--

LOCK TABLES `eloGames` WRITE;
/*!40000 ALTER TABLE `eloGames` DISABLE KEYS */;
INSERT INTO `eloGames` VALUES (1,'sandor','peter',0,-64.00649998028848,64.00649998028848,'klask'),(2,'1233456','Röpi Bajnok',0,-50,50,'röplabda'),(3,'sanyi','dani',1,50,-50,'sakk'),(4,'máté','dani',0,-57.1463117408382,57.1463117408382,'sakk');
/*!40000 ALTER TABLE `eloGames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eloPlayers`
--

DROP TABLE IF EXISTS `eloPlayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `eloPlayers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `rating` double NOT NULL,
  `gameType` varchar(100) DEFAULT NULL,
  `games` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eloPlayers`
--

LOCK TABLES `eloPlayers` WRITE;
/*!40000 ALTER TABLE `eloPlayers` DISABLE KEYS */;
INSERT INTO `eloPlayers` VALUES (1,'sandor',1000,'ping-pong',0),(2,'peter',1014.0064999802885,'klask',2),(3,'sandor',1000,'klask',0),(4,'1233456',950,'röplabda',1),(5,'Röpi Bajnok',1050,'röplabda',1),(6,'sanyi',1050,'sakk',1),(7,'dani',1007.1463117408382,'sakk',2),(8,'máté',942.8536882591618,'sakk',1);
/*!40000 ALTER TABLE `eloPlayers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupPlayers`
--

DROP TABLE IF EXISTS `groupPlayers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `groupPlayers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playerName` varchar(100) NOT NULL,
  `wins` int DEFAULT '0',
  `loses` int DEFAULT '0',
  `draws` int DEFAULT '0',
  `last3Results` varchar(3) DEFAULT NULL,
  `points` int DEFAULT NULL,
  `gameName` varchar(100) DEFAULT NULL,
  `groupName` varchar(100) NOT NULL,
  `diff` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`gameName`,`playerName`)
) ENGINE=InnoDB AUTO_INCREMENT=2088 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupPlayers`
--

LOCK TABLES `groupPlayers` WRITE;
/*!40000 ALTER TABLE `groupPlayers` DISABLE KEYS */;
INSERT INTO `groupPlayers` VALUES (1988,'Játékos 6',0,0,0,'',0,'thopz','A Csoport',0),(1989,'Játékos 7',0,0,0,'',0,'thopz','A Csoport',0),(1990,'Játékos 5',0,0,0,'',0,'thopz','A Csoport',0),(1991,'Játékos 16',0,0,0,'',0,'thopz','A Csoport',0),(1992,'Játékos 14',0,0,0,'',0,'thopz','B Csoport',0),(1993,'Játékos 18',0,0,0,'',0,'thopz','B Csoport',0),(1994,'Játékos 11',0,0,0,'',0,'thopz','B Csoport',0),(1995,'Játékos 19',0,0,0,'',0,'thopz','B Csoport',0),(1996,'Játékos 9',0,0,0,'',0,'thopz','C Csoport',0),(1997,'Játékos 3',0,0,0,'',0,'thopz','C Csoport',0),(1998,'Játékos 4',0,0,0,'',0,'thopz','C Csoport',0),(1999,'Játékos 8',0,0,0,'',0,'thopz','C Csoport',0),(2000,'Játékos 17',0,0,0,'',0,'thopz','D Csoport',0),(2001,'Játékos 12',0,0,0,'',0,'thopz','D Csoport',0),(2002,'Játékos 13',0,0,0,'',0,'thopz','D Csoport',0),(2003,'Játékos 2',0,0,0,'',0,'thopz','D Csoport',0),(2004,'Játékos 15',0,0,0,'',0,'thopz','E Csoport',0),(2005,'Játékos 1',0,0,0,'',0,'thopz','E Csoport',0),(2006,'Játékos 10',0,0,0,'',0,'thopz','E Csoport',0),(2007,'Játékos 20',0,0,0,'',0,'thopz','E Csoport',0),(2068,'Játékos 6',2,0,0,'WW',6,'csop1','A Csoport',7),(2069,'Játékos 5',1,0,0,'W',3,'csop1','A Csoport',3),(2070,'Játékos 7',0,2,0,'LL',0,'csop1','A Csoport',-5),(2071,'Játékos 16',0,1,0,'L',0,'csop1','A Csoport',-5),(2072,'Játékos 11',0,0,0,'',0,'csop1','B Csoport',0),(2073,'Játékos 14',0,0,0,'',0,'csop1','B Csoport',0),(2074,'Játékos 18',0,0,0,'',0,'csop1','B Csoport',0),(2075,'Játékos 19',0,0,0,'',0,'csop1','B Csoport',0),(2076,'Játékos 9',0,0,0,'',0,'csop1','C Csoport',0),(2077,'Játékos 8',0,0,0,'',0,'csop1','C Csoport',0),(2078,'Játékos 4',0,0,0,'',0,'csop1','C Csoport',0),(2079,'Játékos 3',0,0,0,'',0,'csop1','C Csoport',0),(2080,'Játékos 2',0,0,0,'',0,'csop1','D Csoport',0),(2081,'Játékos 17',0,0,0,'',0,'csop1','D Csoport',0),(2082,'Játékos 13',0,0,0,'',0,'csop1','D Csoport',0),(2083,'Játékos 12',0,0,0,'',0,'csop1','D Csoport',0),(2084,'Játékos 20',0,0,0,'',0,'csop1','E Csoport',0),(2085,'Játékos 15',0,0,0,'',0,'csop1','E Csoport',0),(2086,'Játékos 10',0,0,0,'',0,'csop1','E Csoport',0),(2087,'Játékos 1',0,0,0,'',0,'csop1','E Csoport',0);
/*!40000 ALTER TABLE `groupPlayers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupStage`
--

DROP TABLE IF EXISTS `groupStage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `groupStage` (
  `gameName` varchar(100) NOT NULL,
  `qualifyNumber` int NOT NULL DEFAULT '2',
  `gameType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`gameName`),
  UNIQUE KEY `gameName` (`gameName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupStage`
--

LOCK TABLES `groupStage` WRITE;
/*!40000 ALTER TABLE `groupStage` DISABLE KEYS */;
INSERT INTO `groupStage` VALUES ('csop1',2,'csocsó'),('thopz',2,'csocsó');
/*!40000 ALTER TABLE `groupStage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `displayName` varchar(100) DEFAULT NULL,
  `privilegeType` varchar(100) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('csopvez','2022panyokifi2','Csoport Vezető','Normal'),('sanyi99','sakkiraly11','Sanyi','Admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-14  7:37:11
