Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ImageTransparency
{
    public static void RemoveBlackBackground(string inputPath, string outputPath)
    {
        using (Bitmap src = new Bitmap(inputPath))
        {
            int width = src.Width;
            int height = src.Height;
            Bitmap dest = new Bitmap(width, height, PixelFormat.Format32bppArgb);

            BitmapData srcData = src.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.ReadOnly, PixelFormat.Format32bppRgb);
            BitmapData destData = dest.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

            int bytes = Math.Abs(srcData.Stride) * height;
            byte[] srcBytes = new byte[bytes];
            byte[] destBytes = new byte[bytes];

            Marshal.Copy(srcData.Scan0, srcBytes, 0, bytes);

            for (int i = 0; i < bytes; i += 4)
            {
                byte b = srcBytes[i];
                byte g = srcBytes[i + 1];
                byte r = srcBytes[i + 2];

                // Max component / perceived brightness
                int maxVal = Math.Max(r, Math.Max(g, b));

                // Thresholds for smooth anti-aliased cutout
                int lowThreshold = 18;
                int highThreshold = 65;

                byte alpha;
                if (maxVal <= lowThreshold)
                {
                    alpha = 0;
                }
                else if (maxVal >= highThreshold)
                {
                    alpha = 255;
                }
                else
                {
                    // Linear ramp for smooth edge anti-aliasing
                    float t = (float)(maxVal - lowThreshold) / (highThreshold - lowThreshold);
                    alpha = (byte)(t * 255);
                }

                destBytes[i] = b;
                destBytes[i + 1] = g;
                destBytes[i + 2] = r;
                destBytes[i + 3] = alpha;
            }

            Marshal.Copy(destBytes, 0, destData.Scan0, bytes);

            src.UnlockBits(srcData);
            dest.UnlockBits(destData);

            dest.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing"

[ImageTransparency]::RemoveBlackBackground("X:\launch page\assets\tooth_3d.jpg", "X:\launch page\assets\tooth_3d.png")
Write-Host "SUCCESS: Created transparent PNG at X:\launch page\assets\tooth_3d.png"
