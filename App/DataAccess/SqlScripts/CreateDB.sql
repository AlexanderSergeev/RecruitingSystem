use master;
go

create database RecruitingDB;
go

use RecruitingDB;
go

create table Cars (
	Id int identity primary key,
	Picture text,	    
	Name text,			
	Price money,
	VehiclePower int,
	MaximumSpeed int		
);