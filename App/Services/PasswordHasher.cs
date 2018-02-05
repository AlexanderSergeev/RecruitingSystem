using System;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;

namespace App.Services
{
    /// <summary>
    /// Реализация взята из Microsoft.AspNet.Identity.Crypto
    /// </summary>
    public class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            if (password == null)
                throw new ArgumentNullException("password");
            byte[] salt;
            byte[] bytes;
            using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, 16, 1000))
            {
                salt = rfc2898DeriveBytes.Salt;
                bytes = rfc2898DeriveBytes.GetBytes(32);
            }
            byte[] inArray = new byte[49];
            Buffer.BlockCopy(salt, 0, inArray, 1, 16);
            Buffer.BlockCopy(bytes, 0, inArray, 17, 32);
            return Convert.ToBase64String(inArray);
        }

        public static bool VerifyHashedPassword(string hashedPassword, string password)
        {
            if (hashedPassword == null)
                return false;
            if (password == null)
                throw new ArgumentNullException("password");
            byte[] numArray = Convert.FromBase64String(hashedPassword);
            if (numArray.Length != 49 || (int)numArray[0] != 0)
                return false;
            byte[] salt = new byte[16];
            Buffer.BlockCopy((Array)numArray, 1, (Array)salt, 0, 16);
            byte[] a = new byte[32];
            Buffer.BlockCopy((Array)numArray, 17, (Array)a, 0, 32);
            byte[] bytes;
            using (Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, salt, 1000))
                bytes = rfc2898DeriveBytes.GetBytes(32);
            return ByteArraysEqual(a, bytes);
        }

        [MethodImpl(MethodImplOptions.NoOptimization)]
        private static bool ByteArraysEqual(byte[] a, byte[] b)
        {
            if (ReferenceEquals(a, b))
                return true;
            if (a == null || b == null || a.Length != b.Length)
                return false;
            var flag = true;
            for (var index = 0; index < a.Length; ++index)
                flag &= a[index] == b[index];
            return flag;
        }
    }
}