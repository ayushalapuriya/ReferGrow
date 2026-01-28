import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileImagesDir = path.join(uploadsDir, "profile-images");
    if (!fs.existsSync(profileImagesDir)) {
      fs.mkdirSync(profileImagesDir, { recursive: true });
    }
    cb(null, profileImagesDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${uniqueSuffix}${ext}`);
  }
});

// File filter for images only with enhanced security
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check MIME type
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }
  
  // Check file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error("Invalid file extension. Allowed: " + allowedExtensions.join(', ')));
  }
  
  // Check filename for suspicious patterns
  const suspiciousPatterns = [/\.php$/, /\.asp$/, /\.jsp$/, /\.exe$/, /\.bat$/, /\.sh$/];
  if (suspiciousPatterns.some(pattern => pattern.test(file.originalname))) {
    return cb(new Error("Suspicious file name detected"));
  }
  
  cb(null, true);
};

// Configure multer with enhanced security
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // Reduced to 2MB for better security
    files: 1, // Only allow one file at a time
  },
});

// Helper function to get file URL
export function getFileUrl(filename: string): string {
  return `/uploads/profile-images/${filename}`;
}

// Configure multer for service import files (Excel/CSV)
const importStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const importsDir = path.join(uploadsDir, "imports");
    if (!fs.existsSync(importsDir)) {
      fs.mkdirSync(importsDir, { recursive: true });
    }
    cb(null, importsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `service-import-${uniqueSuffix}${ext}`);
  }
});

// File filter for Excel/CSV files only with enhanced security
const importFileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
    "application/csv"
  ];

  // Check MIME type
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only Excel (.xlsx) and CSV (.csv) files are allowed"));
  }
  
  // Check file extension
  const allowedExtensions = ['.xlsx', '.csv'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error("Invalid file extension. Allowed: " + allowedExtensions.join(', ')));
  }
  
  // Check filename for suspicious patterns
  const suspiciousPatterns = [/\.php$/, /\.asp$/, /\.jsp$/, /\.exe$/, /\.bat$/, /\.sh$/, /\.js$/];
  if (suspiciousPatterns.some(pattern => pattern.test(file.originalname))) {
    return cb(new Error("Suspicious file name detected"));
  }

  cb(null, true);
};

// Configure multer for imports with enhanced security
export const importUpload = multer({
  storage: importStorage,
  fileFilter: importFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Reduced to 5MB for imports
    files: 1, // Only allow one file at a time
  },
});
