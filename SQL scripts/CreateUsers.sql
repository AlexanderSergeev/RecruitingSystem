DECLARE @adminRoleId INT;
DECLARE @hrRoleId INT;
DECLARE @directorRoleId INT;
DECLARE @projectRoleId INT;

INSERT INTO [dbo].[AspNetRoles] ([Name]) VALUES (N'Administrator');
SELECT @adminRoleId = SCOPE_IDENTITY();
INSERT INTO [dbo].[AspNetRoles] ([Name]) VALUES (N'Director')
SELECT @directorRoleId = SCOPE_IDENTITY();
INSERT INTO [dbo].[AspNetRoles] ([Name]) VALUES (N'HR')
SELECT @hrRoleId = SCOPE_IDENTITY();
INSERT INTO [dbo].[AspNetRoles] ([Name]) VALUES (N'ProjectManager')
SELECT @projectRoleId = SCOPE_IDENTITY();

DECLARE @administratorUserId INT;

INSERT INTO [dbo].[AspNetUsers]
           ([Email]
           ,[EmailConfirmed]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[PhoneNumber]
           ,[PhoneNumberConfirmed]
           ,[TwoFactorEnabled]
           ,[LockoutEndDateUtc]
           ,[LockoutEnabled]
           ,[AccessFailedCount]
           ,[UserName])
     VALUES
           (N'admin@admin.com'
           ,1
           ,N'AOE5qmpKwWGC3eMCRhhDhEXQwBRbzoVX5/3Ojt0pWg5UwIhQVjUFMVrGjO+2pXXuRg=='
           ,N'e9933650-62ab-4786-b8cd-b0e1243a5c93'
           ,N'+70000000000'
           ,0
           ,0
           ,NULL
           ,1
           ,0
           ,N'admin@kpmg.ru');
SELECT @administratorUserId = SCOPE_IDENTITY();

INSERT INTO [dbo].[AspNetUserRoles]
           ([UserId]
           ,[RoleId])
     VALUES
           (@administratorUserId, @adminRoleId);

DECLARE @hrUserId INT;

INSERT INTO [dbo].[AspNetUsers]
           ([Email]
           ,[EmailConfirmed]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[PhoneNumber]
           ,[PhoneNumberConfirmed]
           ,[TwoFactorEnabled]
           ,[LockoutEndDateUtc]
           ,[LockoutEnabled]
           ,[AccessFailedCount]
           ,[UserName])
     VALUES
           (N'hr@hr.com'
           ,1
           ,N'AOE5qmpKwWGC3eMCRhhDhEXQwBRbzoVX5/3Ojt0pWg5UwIhQVjUFMVrGjO+2pXXuRg=='
           ,N'e9933650-62ab-4786-b8cd-b0e1243a5c93'
           ,N'+70000000000'
           ,0
           ,0
           ,NULL
           ,1
           ,0
           ,N'hr@hr.com');
SELECT @hrUserId = SCOPE_IDENTITY();

INSERT INTO [dbo].[AspNetUserRoles]
           ([UserId]
           ,[RoleId])
     VALUES
           (@hrUserId, @hrRoleId);


DECLARE @directorUserId INT;

INSERT INTO [dbo].[AspNetUsers]
           ([Email]
           ,[EmailConfirmed]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[PhoneNumber]
           ,[PhoneNumberConfirmed]
           ,[TwoFactorEnabled]
           ,[LockoutEndDateUtc]
           ,[LockoutEnabled]
           ,[AccessFailedCount]
           ,[UserName])
     VALUES
           (N'director@director.com'
           ,1
           ,N'AOE5qmpKwWGC3eMCRhhDhEXQwBRbzoVX5/3Ojt0pWg5UwIhQVjUFMVrGjO+2pXXuRg=='
           ,N'e9933650-62ab-4786-b8cd-b0e1243a5c93'
           ,N'+70000000000'
           ,0
           ,0
           ,NULL
           ,1
           ,0
           ,N'director@director.com');
SELECT @directorUserId = SCOPE_IDENTITY();

INSERT INTO [dbo].[AspNetUserRoles]
           ([UserId]
           ,[RoleId])
     VALUES
           (@directorUserId, @directorRoleId);

DECLARE @projectUserId INT;

INSERT INTO [dbo].[AspNetUsers]
           ([Email]
           ,[EmailConfirmed]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[PhoneNumber]
           ,[PhoneNumberConfirmed]
           ,[TwoFactorEnabled]
           ,[LockoutEndDateUtc]
           ,[LockoutEnabled]
           ,[AccessFailedCount]
           ,[UserName])
     VALUES
           (N'project@project.com'
           ,1
           ,N'AOE5qmpKwWGC3eMCRhhDhEXQwBRbzoVX5/3Ojt0pWg5UwIhQVjUFMVrGjO+2pXXuRg=='
           ,N'e9933650-62ab-4786-b8cd-b0e1243a5c93'
           ,N'+70000000000'
           ,0
           ,0
           ,NULL
           ,1
           ,0
           ,N'project@project.com');
SELECT @projectUserId = SCOPE_IDENTITY();

INSERT INTO [dbo].[AspNetUserRoles]
           ([UserId]
           ,[RoleId])
     VALUES
           (@projectUserId, @projectRoleId);




















