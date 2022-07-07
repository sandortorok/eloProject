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
) ENGINE=InnoDB AUTO_INCREMENT=2943 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEMatches`
--

LOCK TABLES `DEMatches` WRITE;
/*!40000 ALTER TABLE `DEMatches` DISABLE KEYS */;
INSERT INTO `DEMatches` VALUES (2726,'mokk2','Játékos 9',0,'Játékos 9','',1,1,1,NULL,'dekázás',0,8,NULL,0,0,-1,-1),(2727,'mokk2','Játékos 10',0,'Játékos 10','',1,1,1,NULL,'dekázás',1,8,NULL,1,0,-1,-1),(2728,'mokk2','Játékos 6',0,'Játékos 6','',1,1,1,NULL,'dekázás',0,9,NULL,2,0,-1,-1),(2729,'mokk2','Játékos 1',0,'Játékos 1','',1,1,1,NULL,'dekázás',1,9,NULL,3,0,-1,-1),(2730,'mokk2','Játékos 2',0,'Játékos 2','',1,1,1,NULL,'dekázás',0,10,NULL,4,0,-1,-1),(2731,'mokk2','Játékos 4',0,'Játékos 4','',1,1,1,NULL,'dekázás',1,10,NULL,5,0,-1,-1),(2732,'mokk2','',0,'Játékos 5','Játékos 7',1,0,NULL,NULL,'dekázás',0,11,NULL,6,0,-1,-1),(2733,'mokk2','',0,'Játékos 8','Játékos 3',1,0,NULL,NULL,'dekázás',1,11,NULL,7,0,-1,-1),(2734,'mokk2','Játékos 9',0,'Játékos 9','Játékos 10',2,0,NULL,NULL,'dekázás',0,12,NULL,8,0,-1,-1),(2735,'mokk2','',0,'Játékos 6','Játékos 1',2,0,NULL,NULL,'dekázás',1,12,NULL,9,0,-1,-1),(2736,'mokk2','Játékos 2',0,'Játékos 2','Játékos 4',2,0,NULL,NULL,'dekázás',0,13,NULL,10,0,-1,-1),(2737,'mokk2','',0,'','',2,0,NULL,NULL,'dekázás',1,13,NULL,11,0,-1,-1),(2738,'mokk2','',0,'Játékos 9','',3,0,NULL,NULL,'dekázás',0,14,NULL,12,0,-1,-1),(2739,'mokk2','',0,'Játékos 2','',3,0,NULL,NULL,'dekázás',1,14,NULL,13,0,-1,-1),(2740,'mokk2','',0,'','',4,0,NULL,NULL,'dekázás',0,29,NULL,14,0,-1,-1),(2741,'mokk2','',1,'','',1,1,NULL,NULL,'dekázás',0,19,NULL,15,0,-1,-1),(2742,'mokk2','',1,'','',1,1,NULL,NULL,'dekázás',1,20,NULL,16,0,-1,-1),(2743,'mokk2','',1,'','',1,1,NULL,NULL,'dekázás',1,21,NULL,17,0,-1,-1),(2744,'mokk2','',1,'Loser of 6','Loser of 7',1,0,NULL,NULL,'dekázás',1,22,NULL,18,0,6,7),(2745,'mokk2','Loser of 11',1,'Loser of 11','',2,0,NULL,NULL,'dekázás',0,23,NULL,19,0,11,-1),(2746,'mokk2','Játékos 4',1,'Játékos 4','',2,0,NULL,NULL,'dekázás',1,23,NULL,20,0,10,-1),(2747,'mokk2','Loser of 9',1,'Loser of 9','',2,0,NULL,NULL,'dekázás',0,24,NULL,21,0,9,-1),(2748,'mokk2','',1,'Játékos 10','',2,0,NULL,NULL,'dekázás',1,24,NULL,22,0,8,-1),(2749,'mokk2','',1,'Loser of 11','Játékos 4',3,0,NULL,NULL,'dekázás',0,25,NULL,23,0,11,10),(2750,'mokk2','',1,'Loser of 9','',3,0,NULL,NULL,'dekázás',1,26,NULL,24,0,9,-1),(2751,'mokk2','',1,'Loser of 13','',4,0,NULL,NULL,'dekázás',0,27,NULL,25,0,13,-1),(2752,'mokk2','',1,'Loser of 12','',4,0,NULL,NULL,'dekázás',1,27,NULL,26,0,12,-1),(2753,'mokk2','',1,'','',5,0,NULL,NULL,'dekázás',0,28,NULL,27,0,-1,-1),(2754,'mokk2','',1,'Loser of 14','',6,0,NULL,NULL,'dekázás',1,29,NULL,28,0,14,-1),(2755,'mokk2','',0,'Winner of Winner\'s Bracket','Winner of Loser\'s Bracket',7,0,NULL,NULL,'dekázás',0,30,NULL,29,1,-1,-1),(2756,'mokk2','',0,'Winner of 29 (if needed)','Loser of 29',8,0,NULL,NULL,'dekázás',0,-1,NULL,30,1,-1,29),(2757,'1w9sa','Játékos 3',0,'Játékos 3','',1,1,1,NULL,'sakk',0,8,NULL,0,0,-1,-1),(2758,'1w9sa','Játékos 1',0,'Játékos 1','',1,1,1,NULL,'sakk',1,8,NULL,1,0,-1,-1),(2759,'1w9sa','Játékos 10',0,'Játékos 10','',1,1,1,NULL,'sakk',0,9,NULL,2,0,-1,-1),(2760,'1w9sa','Játékos 2',0,'Játékos 2','',1,1,1,NULL,'sakk',1,9,NULL,3,0,-1,-1),(2761,'1w9sa','Játékos 9',0,'Játékos 9','',1,1,1,NULL,'sakk',0,10,NULL,4,0,-1,-1),(2762,'1w9sa','Játékos 5',0,'Játékos 5','',1,1,1,NULL,'sakk',1,10,NULL,5,0,-1,-1),(2763,'1w9sa','',0,'Játékos 8','Játékos 6',1,0,NULL,NULL,'sakk',0,11,NULL,6,0,-1,-1),(2764,'1w9sa','',0,'Játékos 7','Játékos 4',1,0,NULL,NULL,'sakk',1,11,NULL,7,0,-1,-1),(2765,'1w9sa','',0,'Játékos 3','Játékos 1',2,0,NULL,NULL,'sakk',0,12,NULL,8,0,-1,-1),(2766,'1w9sa','',0,'Játékos 10','Játékos 2',2,0,NULL,NULL,'sakk',1,12,NULL,9,0,-1,-1),(2767,'1w9sa','',0,'Játékos 9','Játékos 5',2,0,NULL,NULL,'sakk',0,13,NULL,10,0,-1,-1),(2768,'1w9sa','',0,'','',2,0,NULL,NULL,'sakk',1,13,NULL,11,0,-1,-1),(2769,'1w9sa','',0,'','',3,0,NULL,NULL,'sakk',0,14,NULL,12,0,-1,-1),(2770,'1w9sa','',0,'','',3,0,NULL,NULL,'sakk',1,14,NULL,13,0,-1,-1),(2771,'1w9sa','',0,'','',4,0,NULL,NULL,'sakk',0,29,NULL,14,0,-1,-1),(2772,'1w9sa','',1,'','',1,1,NULL,NULL,'sakk',0,19,NULL,15,0,-1,-1),(2773,'1w9sa','',1,'','',1,1,NULL,NULL,'sakk',1,20,NULL,16,0,-1,-1),(2774,'1w9sa','',1,'','',1,1,NULL,NULL,'sakk',1,21,NULL,17,0,-1,-1),(2775,'1w9sa','',1,'Loser of 6','Loser of 7',1,0,NULL,NULL,'sakk',1,22,NULL,18,0,6,7),(2776,'1w9sa','Loser of 11',1,'Loser of 11','',2,0,NULL,NULL,'sakk',0,23,NULL,19,0,11,-1),(2777,'1w9sa','Loser of 10',1,'Loser of 10','',2,0,NULL,NULL,'sakk',1,23,NULL,20,0,10,-1),(2778,'1w9sa','Loser of 9',1,'Loser of 9','',2,0,NULL,NULL,'sakk',0,24,NULL,21,0,9,-1),(2779,'1w9sa','',1,'Loser of 8','',2,0,NULL,NULL,'sakk',1,24,NULL,22,0,8,-1),(2780,'1w9sa','',1,'Loser of 11','Loser of 10',3,0,NULL,NULL,'sakk',0,25,NULL,23,0,11,10),(2781,'1w9sa','',1,'Loser of 9','',3,0,NULL,NULL,'sakk',1,26,NULL,24,0,9,-1),(2782,'1w9sa','',1,'Loser of 13','',4,0,NULL,NULL,'sakk',0,27,NULL,25,0,13,-1),(2783,'1w9sa','',1,'Loser of 12','',4,0,NULL,NULL,'sakk',1,27,NULL,26,0,12,-1),(2784,'1w9sa','',1,'','',5,0,NULL,NULL,'sakk',0,28,NULL,27,0,-1,-1),(2785,'1w9sa','',1,'Loser of 14','',6,0,NULL,NULL,'sakk',1,29,NULL,28,0,14,-1),(2786,'1w9sa','',0,'Winner of Winner\'s Bracket','Winner of Loser\'s Bracket',7,0,NULL,NULL,'sakk',0,30,NULL,29,1,-1,-1),(2787,'1w9sa','',0,'Winner of 29 (if needed)','Loser of 29',8,0,NULL,NULL,'sakk',0,-1,NULL,30,1,-1,29),(2819,'a2adg','Játékos 10',0,'Játékos 10','',1,1,1,NULL,'klask',0,8,NULL,0,0,-1,-1),(2820,'a2adg','Játékos 3',0,'Játékos 3','',1,1,1,NULL,'klask',1,8,NULL,1,0,-1,-1),(2821,'a2adg','Játékos 9',0,'Játékos 9','',1,1,1,NULL,'klask',0,9,NULL,2,0,-1,-1),(2822,'a2adg','Játékos 11',0,'Játékos 11','',1,1,1,NULL,'klask',1,9,NULL,3,0,-1,-1),(2823,'a2adg','Játékos 5',0,'Játékos 5','',1,1,1,NULL,'klask',0,10,NULL,4,0,-1,-1),(2824,'a2adg','',0,'Játékos 4','Játékos 6',1,0,NULL,NULL,'klask',1,10,NULL,5,0,-1,-1),(2825,'a2adg','',0,'Játékos 2','Játékos 8',1,0,NULL,NULL,'klask',0,11,NULL,6,0,-1,-1),(2826,'a2adg','',0,'Játékos 1','Játékos 7',1,0,NULL,NULL,'klask',1,11,NULL,7,0,-1,-1),(2827,'a2adg','Játékos 10',0,'Játékos 10','Játékos 3',2,0,NULL,NULL,'klask',0,12,NULL,8,0,-1,-1),(2828,'a2adg','',0,'Játékos 9','Játékos 11',2,0,NULL,NULL,'klask',1,12,NULL,9,0,-1,-1),(2829,'a2adg','',0,'Játékos 5','',2,0,NULL,NULL,'klask',0,13,NULL,10,0,-1,-1),(2830,'a2adg','',0,'','',2,0,NULL,NULL,'klask',1,13,NULL,11,0,-1,-1),(2831,'a2adg','',0,'Játékos 10','',3,0,NULL,NULL,'klask',0,14,NULL,12,0,-1,-1),(2832,'a2adg','',0,'','',3,0,NULL,NULL,'klask',1,14,NULL,13,0,-1,-1),(2833,'a2adg','',0,'','',4,0,NULL,NULL,'klask',0,29,NULL,14,0,-1,-1),(2834,'a2adg','',1,'','',1,1,NULL,NULL,'klask',0,19,NULL,15,0,-1,-1),(2835,'a2adg','',1,'','',1,1,NULL,NULL,'klask',1,20,NULL,16,0,-1,-1),(2836,'a2adg','Loser of 5',1,'','Loser of 5',1,1,NULL,NULL,'klask',1,21,NULL,17,0,-1,5),(2837,'a2adg','',1,'Loser of 6','Loser of 7',1,0,NULL,NULL,'klask',1,22,NULL,18,0,6,7),(2838,'a2adg','Loser of 11',1,'Loser of 11','',2,0,NULL,NULL,'klask',0,23,NULL,19,0,11,-1),(2839,'a2adg','Loser of 10',1,'Loser of 10','',2,0,NULL,NULL,'klask',1,23,NULL,20,0,10,-1),(2840,'a2adg','',1,'Loser of 9','Loser of 5',2,0,NULL,NULL,'klask',0,24,NULL,21,0,9,5),(2841,'a2adg','',1,'Játékos 3','',2,0,NULL,NULL,'klask',1,24,NULL,22,0,8,-1),(2842,'a2adg','',1,'Loser of 11','Loser of 10',3,0,NULL,NULL,'klask',0,25,NULL,23,0,11,10),(2843,'a2adg','',1,'','',3,0,NULL,NULL,'klask',1,26,NULL,24,0,-1,-1),(2844,'a2adg','',1,'Loser of 13','',4,0,NULL,NULL,'klask',0,27,NULL,25,0,13,-1),(2845,'a2adg','',1,'Loser of 12','',4,0,NULL,NULL,'klask',1,27,NULL,26,0,12,-1),(2846,'a2adg','',1,'','',5,0,NULL,NULL,'klask',0,28,NULL,27,0,-1,-1),(2847,'a2adg','',1,'Loser of 14','',6,0,NULL,NULL,'klask',1,29,NULL,28,0,14,-1),(2848,'a2adg','',0,'Winner of Winner\'s Bracket','Winner of Loser\'s Bracket',7,0,NULL,NULL,'klask',0,30,NULL,29,1,-1,-1),(2849,'a2adg','',0,'Winner of 29 (if needed)','Loser of 29',8,0,NULL,NULL,'klask',0,-1,NULL,30,1,-1,29),(2912,'fyb78','Játékos 2',0,'Játékos 2','',1,1,1,NULL,'klask',0,8,NULL,0,0,-1,-1),(2913,'fyb78','Játékos 9',0,'Játékos 9','',1,1,1,NULL,'klask',1,8,NULL,1,0,-1,-1),(2914,'fyb78','Játékos 6',0,'Játékos 6','',1,1,1,NULL,'klask',0,9,NULL,2,0,-1,-1),(2915,'fyb78','Játékos 7',0,'Játékos 7','',1,1,1,NULL,'klask',1,9,NULL,3,0,-1,-1),(2916,'fyb78','Játékos 3',0,'Játékos 3','',1,1,1,NULL,'klask',0,10,NULL,4,0,-1,-1),(2917,'fyb78','Játékos 5',0,'Játékos 5','',1,1,1,NULL,'klask',1,10,NULL,5,0,-1,-1),(2918,'fyb78','',0,'Játékos 10','Játékos 1',1,0,NULL,NULL,'klask',0,11,NULL,6,0,-1,-1),(2919,'fyb78','',0,'Játékos 4','Játékos 8',1,0,NULL,NULL,'klask',1,11,NULL,7,0,-1,-1),(2920,'fyb78','Játékos 2',0,'Játékos 2','Játékos 9',2,0,5,1,'klask',0,12,NULL,8,0,-1,-1),(2921,'fyb78','Játékos 6',0,'Játékos 6','Játékos 7',2,0,4,7,'klask',1,12,NULL,9,0,-1,-1),(2922,'fyb78','',0,'Játékos 3','Játékos 5',2,0,NULL,NULL,'klask',0,13,NULL,10,0,-1,-1),(2923,'fyb78','',0,'','',2,0,NULL,NULL,'klask',1,13,NULL,11,0,-1,-1),(2924,'fyb78','',0,'Játékos 2','Játékos 6',3,0,NULL,NULL,'klask',0,14,NULL,12,0,-1,-1),(2925,'fyb78','',0,'','',3,0,NULL,NULL,'klask',1,14,NULL,13,0,-1,-1),(2926,'fyb78','',0,'','',4,0,NULL,NULL,'klask',0,29,NULL,14,0,-1,-1),(2927,'fyb78','',1,'','',1,1,NULL,NULL,'klask',0,19,NULL,15,0,-1,-1),(2928,'fyb78','',1,'','',1,1,NULL,NULL,'klask',1,20,NULL,16,0,-1,-1),(2929,'fyb78','',1,'','',1,1,NULL,NULL,'klask',1,21,NULL,17,0,-1,-1),(2930,'fyb78','',1,'Loser of 6','Loser of 7',1,0,NULL,NULL,'klask',1,22,NULL,18,0,6,7),(2931,'fyb78','Loser of 11',1,'Loser of 11','',2,0,NULL,NULL,'klask',0,23,NULL,19,0,11,-1),(2932,'fyb78','Loser of 10',1,'Loser of 10','',2,0,NULL,NULL,'klask',1,23,NULL,20,0,10,-1),(2933,'fyb78','Játékos 7',1,'Játékos 7','',2,0,NULL,NULL,'klask',0,24,NULL,21,0,9,-1),(2934,'fyb78','',1,'Játékos 9','',2,0,NULL,NULL,'klask',1,24,NULL,22,0,8,-1),(2935,'fyb78','',1,'Loser of 11','Loser of 10',3,0,NULL,NULL,'klask',0,25,NULL,23,0,11,10),(2936,'fyb78','',1,'Játékos 7','',3,0,NULL,NULL,'klask',1,26,NULL,24,0,9,-1),(2937,'fyb78','',1,'Loser of 13','',4,0,NULL,NULL,'klask',0,27,NULL,25,0,13,-1),(2938,'fyb78','',1,'Loser of 12','',4,0,NULL,NULL,'klask',1,27,NULL,26,0,12,-1),(2939,'fyb78','',1,'','',5,0,NULL,NULL,'klask',0,28,NULL,27,0,-1,-1),(2940,'fyb78','',1,'Loser of 14','',6,0,NULL,NULL,'klask',1,29,NULL,28,0,14,-1),(2941,'fyb78','',0,'Winner of Winner\'s Bracket','Winner of Loser\'s Bracket',7,0,NULL,NULL,'klask',0,30,NULL,29,1,-1,-1),(2942,'fyb78','',0,'Winner of 29 (if needed)','Loser of 29',8,0,NULL,NULL,'klask',0,-1,NULL,30,1,-1,29);
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
INSERT INTO `RRMatches` VALUES ('f3ot2','',0,'klask',1,0,'Játékos 1','Játékos 4',0,'',NULL,NULL),('f3ot2','',1,'klask',1,0,'Játékos 5','Játékos 2',0,'',NULL,NULL),('f3ot2','Játékos 6',2,'klask',1,0,'Játékos 6','Játékos 3',0,'',5,8),('f3ot2','',3,'klask',2,0,'Játékos 1','Játékos 5',0,'',NULL,NULL),('f3ot2','',4,'klask',2,0,'Játékos 6','Játékos 4',0,'',NULL,NULL),('f3ot2','',5,'klask',2,0,'Játékos 3','Játékos 2',0,'',NULL,NULL),('f3ot2','',6,'klask',3,0,'Játékos 1','Játékos 6',0,'',NULL,NULL),('f3ot2','',7,'klask',3,0,'Játékos 3','Játékos 5',0,'',NULL,NULL),('f3ot2','',8,'klask',3,0,'Játékos 2','Játékos 4',0,'',NULL,NULL),('f3ot2','',9,'klask',4,0,'Játékos 1','Játékos 3',0,'',NULL,NULL),('f3ot2','',10,'klask',4,0,'Játékos 2','Játékos 6',0,'',NULL,NULL),('f3ot2','',11,'klask',4,0,'Játékos 4','Játékos 5',0,'',NULL,NULL),('f3ot2','',12,'klask',5,0,'Játékos 1','Játékos 2',0,'',NULL,NULL),('f3ot2','',13,'klask',5,0,'Játékos 4','Játékos 3',0,'',NULL,NULL),('f3ot2','',14,'klask',5,0,'Játékos 5','Játékos 6',0,'',NULL,NULL),('qemsk','Játékos 1',0,'csocsó',1,0,'Játékos 1','Játékos 13',1,'A Csoport',4,5),('qemsk','Játékos 15',1,'csocsó',1,0,'Játékos 15','Játékos 14',1,'A Csoport',10,5),('qemsk','Játékos 1',2,'csocsó',2,0,'Játékos 1','Játékos 15',1,'A Csoport',14,3),('qemsk','Játékos 13',3,'csocsó',2,0,'Játékos 14','Játékos 13',1,'A Csoport',10,12),('qemsk','Játékos 1',4,'csocsó',3,0,'Játékos 1','Játékos 14',1,'A Csoport',4,2),('qemsk','Játékos 15',5,'csocsó',3,0,'Játékos 13','Játékos 15',1,'A Csoport',10,50),('qemsk','Játékos 4',6,'csocsó',1,0,'Játékos 4','Játékos 12',1,'B Csoport',10,NULL),('qemsk','Játékos 8',7,'csocsó',1,0,'Játékos 8','Játékos 3',1,'B Csoport',11,2),('qemsk','Játékos 4',8,'csocsó',2,0,'Játékos 4','Játékos 8',1,'B Csoport',10,0),('qemsk','',9,'csocsó',2,0,'Játékos 3','Játékos 12',1,'B Csoport',NULL,NULL),('qemsk','',10,'csocsó',3,0,'Játékos 4','Játékos 3',1,'B Csoport',NULL,NULL),('qemsk','',11,'csocsó',3,0,'Játékos 12','Játékos 8',1,'B Csoport',NULL,NULL),('qemsk','',12,'csocsó',1,0,'Játékos 11','Játékos 9',1,'C Csoport',NULL,NULL),('qemsk','',13,'csocsó',1,0,'Játékos 5','Játékos 6',1,'C Csoport',NULL,NULL),('qemsk','',14,'csocsó',2,0,'Játékos 11','Játékos 5',1,'C Csoport',NULL,NULL),('qemsk','',15,'csocsó',2,0,'Játékos 6','Játékos 9',1,'C Csoport',NULL,NULL),('qemsk','',16,'csocsó',3,0,'Játékos 11','Játékos 6',1,'C Csoport',NULL,NULL),('qemsk','',17,'csocsó',3,0,'Játékos 9','Játékos 5',1,'C Csoport',NULL,NULL),('qemsk','Játékos 10',18,'csocsó',1,1,'Játékos 10','',1,'D Csoport',NULL,NULL),('qemsk','',19,'csocsó',1,0,'Játékos 7','Játékos 2',1,'D Csoport',NULL,NULL),('qemsk','',20,'csocsó',2,0,'Játékos 10','Játékos 7',1,'D Csoport',NULL,NULL),('qemsk','Játékos 2',21,'csocsó',2,1,'Játékos 2','',1,'D Csoport',NULL,NULL),('qemsk','',22,'csocsó',3,0,'Játékos 10','Játékos 2',1,'D Csoport',NULL,NULL),('qemsk','Játékos 7',23,'csocsó',3,1,'','Játékos 7',1,'D Csoport',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=541 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SEMatches`
--

LOCK TABLES `SEMatches` WRITE;
/*!40000 ALTER TABLE `SEMatches` DISABLE KEYS */;
INSERT INTO `SEMatches` VALUES (350,'biba8','Játékos 5','Játékos 5','',1,1,1,NULL,'sakk',0,8,0),(351,'biba8','Játékos 2','Játékos 2','',1,1,1,NULL,'sakk',1,8,1),(352,'biba8','Játékos 7','Játékos 7','',1,1,1,NULL,'sakk',0,9,2),(353,'biba8','Játékos 4','Játékos 4','',1,1,1,NULL,'sakk',1,9,3),(354,'biba8','Játékos 10','Játékos 10','',1,1,1,NULL,'sakk',0,10,4),(355,'biba8','Játékos 9','Játékos 9','',1,1,1,NULL,'sakk',1,10,5),(356,'biba8','Játékos 1','Játékos 1','Játékos 3',1,0,NULL,NULL,'sakk',0,11,6),(357,'biba8','Játékos 8','Játékos 8','Játékos 6',1,0,NULL,NULL,'sakk',1,11,7),(358,'biba8','Játékos 2','Játékos 5','Játékos 2',2,0,NULL,NULL,'sakk',0,12,8),(359,'biba8','Játékos 7','Játékos 7','Játékos 4',2,0,NULL,NULL,'sakk',1,12,9),(360,'biba8','Játékos 10','Játékos 10','Játékos 9',2,0,NULL,NULL,'sakk',0,13,10),(361,'biba8','Játékos 8','Játékos 1','Játékos 8',2,0,NULL,NULL,'sakk',1,13,11),(362,'biba8','Játékos 7','Játékos 2','Játékos 7',3,0,NULL,NULL,'sakk',0,14,12),(363,'biba8','Játékos 10','Játékos 10','Játékos 8',3,0,NULL,NULL,'sakk',1,14,13),(364,'biba8','Játékos 10','Játékos 7','Játékos 10',4,0,NULL,NULL,'sakk',0,-1,14),(365,'rtima','','Játékos 3','Játékos 8',1,0,NULL,NULL,'frizbi',0,4,0),(366,'rtima','','Játékos 6','Játékos 5',1,0,NULL,NULL,'frizbi',1,4,1),(367,'rtima','','Játékos 2','Játékos 1',1,0,NULL,NULL,'frizbi',0,5,2),(368,'rtima','','Játékos 4','Játékos 7',1,0,NULL,NULL,'frizbi',1,5,3),(369,'rtima','','','',2,0,NULL,NULL,'frizbi',0,6,4),(370,'rtima','','','',2,0,NULL,NULL,'frizbi',1,6,5),(371,'rtima','','','',3,0,NULL,NULL,'frizbi',0,-1,6),(402,'smu1j','','Játékos 17','Játékos 22',1,0,NULL,NULL,'sakk',0,16,0),(403,'smu1j','','Játékos 28','Játékos 23',1,0,NULL,NULL,'sakk',1,16,1),(404,'smu1j','','Játékos 7','Játékos 24',1,0,NULL,NULL,'sakk',0,17,2),(405,'smu1j','','Játékos 21','Játékos 2',1,0,NULL,NULL,'sakk',1,17,3),(406,'smu1j','','Játékos 26','Játékos 6',1,0,NULL,NULL,'sakk',0,18,4),(407,'smu1j','','Játékos 11','Játékos 13',1,0,NULL,NULL,'sakk',1,18,5),(408,'smu1j','','Játékos 12','Játékos 4',1,0,NULL,NULL,'sakk',0,19,6),(409,'smu1j','','Játékos 31','Játékos 14',1,0,NULL,NULL,'sakk',1,19,7),(410,'smu1j','','Játékos 5','Játékos 15',1,0,NULL,NULL,'sakk',0,20,8),(411,'smu1j','','Játékos 25','Játékos 29',1,0,NULL,NULL,'sakk',1,20,9),(412,'smu1j','','Játékos 8','Játékos 1',1,0,NULL,NULL,'sakk',0,21,10),(413,'smu1j','','Játékos 9','Játékos 30',1,0,NULL,NULL,'sakk',1,21,11),(414,'smu1j','','Játékos 19','Játékos 32',1,0,NULL,NULL,'sakk',0,22,12),(415,'smu1j','','Játékos 3','Játékos 16',1,0,NULL,NULL,'sakk',1,22,13),(416,'smu1j','','Játékos 10','Játékos 27',1,0,NULL,NULL,'sakk',0,23,14),(417,'smu1j','','Játékos 20','Játékos 18',1,0,NULL,NULL,'sakk',1,23,15),(418,'smu1j','','','',2,0,NULL,NULL,'sakk',0,24,16),(419,'smu1j','','','',2,0,NULL,NULL,'sakk',1,24,17),(420,'smu1j','','','',2,0,NULL,NULL,'sakk',0,25,18),(421,'smu1j','','','',2,0,NULL,NULL,'sakk',1,25,19),(422,'smu1j','','','',2,0,NULL,NULL,'sakk',0,26,20),(423,'smu1j','','','',2,0,NULL,NULL,'sakk',1,26,21),(424,'smu1j','','','',2,0,NULL,NULL,'sakk',0,27,22),(425,'smu1j','','','',2,0,NULL,NULL,'sakk',1,27,23),(426,'smu1j','','','',3,0,NULL,NULL,'sakk',0,28,24),(427,'smu1j','','','',3,0,NULL,NULL,'sakk',1,28,25),(428,'smu1j','','','',3,0,NULL,NULL,'sakk',0,29,26),(429,'smu1j','','','',3,0,NULL,NULL,'sakk',1,29,27),(430,'smu1j','','','',4,0,NULL,NULL,'sakk',0,30,28),(431,'smu1j','','','',4,0,NULL,NULL,'sakk',1,30,29),(432,'smu1j','','','',5,0,NULL,NULL,'sakk',0,-1,30),(433,'5jlki','Játékos 2','Játékos 2','',1,1,1,NULL,'ping-pong-páros',0,8,0),(434,'5jlki','Játékos 3','Játékos 3','',1,1,1,NULL,'ping-pong-páros',1,8,1),(435,'5jlki','Játékos 6','Játékos 6','',1,1,1,NULL,'ping-pong-páros',0,9,2),(436,'5jlki','Játékos 9','Játékos 9','',1,1,1,NULL,'ping-pong-páros',1,9,3),(437,'5jlki','Játékos 10','Játékos 10','',1,1,1,NULL,'ping-pong-páros',0,10,4),(438,'5jlki','Játékos 7','Játékos 7','',1,1,1,NULL,'ping-pong-páros',1,10,5),(439,'5jlki','','Játékos 5','Játékos 4',1,0,NULL,NULL,'ping-pong-páros',0,11,6),(440,'5jlki','','Játékos 8','Játékos 1',1,0,NULL,NULL,'ping-pong-páros',1,11,7),(441,'5jlki','','Játékos 2','Játékos 3',2,0,NULL,NULL,'ping-pong-páros',0,12,8),(442,'5jlki','Játékos 6','Játékos 6','Játékos 9',2,0,NULL,NULL,'ping-pong-páros',1,12,9),(443,'5jlki','Játékos 10','Játékos 10','Játékos 7',2,0,NULL,NULL,'ping-pong-páros',0,13,10),(444,'5jlki','','','',2,0,NULL,NULL,'ping-pong-páros',1,13,11),(445,'5jlki','','','Játékos 6',3,0,NULL,NULL,'ping-pong-páros',0,14,12),(446,'5jlki','','Játékos 10','',3,0,NULL,NULL,'ping-pong-páros',1,14,13),(447,'5jlki','','','',4,0,NULL,NULL,'ping-pong-páros',0,-1,14),(510,'0i7gu','Játékos 14','Játékos 2','Játékos 14',1,0,4,9,'klask',0,16,0),(511,'0i7gu','Játékos 26','Játékos 26','Játékos 30',1,0,NULL,NULL,'klask',1,16,1),(512,'0i7gu','','Játékos 6','Játékos 12',1,0,NULL,NULL,'klask',0,17,2),(513,'0i7gu','','Játékos 24','Játékos 27',1,0,NULL,NULL,'klask',1,17,3),(514,'0i7gu','','Játékos 5','Játékos 15',1,0,NULL,NULL,'klask',0,18,4),(515,'0i7gu','','Játékos 31','Játékos 29',1,0,NULL,NULL,'klask',1,18,5),(516,'0i7gu','','Játékos 32','Játékos 10',1,0,NULL,NULL,'klask',0,19,6),(517,'0i7gu','','Játékos 7','Játékos 17',1,0,NULL,NULL,'klask',1,19,7),(518,'0i7gu','','Játékos 13','Játékos 4',1,0,NULL,NULL,'klask',0,20,8),(519,'0i7gu','','Játékos 19','Játékos 20',1,0,NULL,NULL,'klask',1,20,9),(520,'0i7gu','','Játékos 22','Játékos 1',1,0,NULL,NULL,'klask',0,21,10),(521,'0i7gu','','Játékos 23','Játékos 21',1,0,NULL,NULL,'klask',1,21,11),(522,'0i7gu','','Játékos 25','Játékos 28',1,0,NULL,NULL,'klask',0,22,12),(523,'0i7gu','','Játékos 16','Játékos 11',1,0,NULL,NULL,'klask',1,22,13),(524,'0i7gu','','Játékos 8','Játékos 3',1,0,NULL,NULL,'klask',0,23,14),(525,'0i7gu','','Játékos 18','Játékos 9',1,0,NULL,NULL,'klask',1,23,15),(526,'0i7gu','','Játékos 14','Játékos 26',2,0,NULL,NULL,'klask',0,24,16),(527,'0i7gu','','','',2,0,NULL,NULL,'klask',1,24,17),(528,'0i7gu','','','',2,0,NULL,NULL,'klask',0,25,18),(529,'0i7gu','','','',2,0,NULL,NULL,'klask',1,25,19),(530,'0i7gu','','','',2,0,NULL,NULL,'klask',0,26,20),(531,'0i7gu','','','',2,0,NULL,NULL,'klask',1,26,21),(532,'0i7gu','','','',2,0,NULL,NULL,'klask',0,27,22),(533,'0i7gu','','','',2,0,NULL,NULL,'klask',1,27,23),(534,'0i7gu','','','',3,0,NULL,NULL,'klask',0,28,24),(535,'0i7gu','','','',3,0,NULL,NULL,'klask',1,28,25),(536,'0i7gu','','','',3,0,NULL,NULL,'klask',0,29,26),(537,'0i7gu','','','',3,0,NULL,NULL,'klask',1,29,27),(538,'0i7gu','','','',4,0,NULL,NULL,'klask',0,30,28),(539,'0i7gu','','','',4,0,NULL,NULL,'klask',1,30,29),(540,'0i7gu','','','',5,0,NULL,NULL,'klask',0,-1,30);
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
INSERT INTO `cache` VALUES ('0i7gu','klask','single-elimination','2022-07-04 14:23:54'),('f3ot2','klask','round-robin','2022-07-04 14:23:16'),('fyb78','klask','double-elimination','2022-07-04 15:14:58'),('qemsk','csocsó','group-stage','2022-07-04 15:09:01');
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
-- Table structure for table `groupMatches`
--

DROP TABLE IF EXISTS `groupMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `groupMatches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupGameName` varchar(100) DEFAULT NULL,
  `bracketGameName` varchar(100) DEFAULT NULL,
  `bracketType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupMatches`
--

LOCK TABLES `groupMatches` WRITE;
/*!40000 ALTER TABLE `groupMatches` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupMatches` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1978 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupPlayers`
--

LOCK TABLES `groupPlayers` WRITE;
/*!40000 ALTER TABLE `groupPlayers` DISABLE KEYS */;
INSERT INTO `groupPlayers` VALUES (1963,'Játékos 1',3,0,0,'WWW',9,'qemsk','A Csoport',14),(1964,'Játékos 15',2,1,0,'WLW',6,'qemsk','A Csoport',34),(1965,'Játékos 13',1,2,0,'LWL',3,'qemsk','A Csoport',-39),(1966,'Játékos 14',0,3,0,'LLL',0,'qemsk','A Csoport',-9),(1967,'Játékos 8',1,1,0,'LW',3,'qemsk','B Csoport',-1),(1968,'Játékos 4',2,0,0,'WW',6,'qemsk','B Csoport',10),(1969,'Játékos 12',0,1,0,'L',0,'qemsk','B Csoport',0),(1970,'Játékos 3',0,1,0,'L',0,'qemsk','B Csoport',-9),(1971,'Játékos 11',0,0,0,'',0,'qemsk','C Csoport',0),(1972,'Játékos 5',0,0,0,'',0,'qemsk','C Csoport',0),(1973,'Játékos 6',0,0,0,'',0,'qemsk','C Csoport',0),(1974,'Játékos 9',0,0,0,'',0,'qemsk','C Csoport',0),(1975,'Játékos 10',0,0,0,'',0,'qemsk','D Csoport',0),(1976,'Játékos 7',0,0,0,'',0,'qemsk','D Csoport',0),(1977,'Játékos 2',0,0,0,'',0,'qemsk','D Csoport',0);
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
INSERT INTO `groupStage` VALUES ('qemsk',2,'csocsó');
/*!40000 ALTER TABLE `groupStage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-04 21:38:11
