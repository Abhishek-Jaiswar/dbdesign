import multer from 'multer';

/**
 * Configures the storage settings for multer.
 * This configuration specifies where to store the uploaded files and how to name them.
 */
const storage = multer.diskStorage({
    /**
     * Sets the destination directory for uploaded files.
     * @param {Object} req - The Express request object.
     * @param {Object} file - The file being uploaded.
     * @param {Function} cb - Callback function to set the destination.
     */
    destination: function (req, file, cb) {
        cb(null, './public/temp'); // Files will be stored in the './public/temp' directory
    },
    /**
     * Sets the filename for the uploaded files.
     * @param {Object} req - The Express request object.
     * @param {Object} file - The file being uploaded.
     * @param {Function} cb - Callback function to set the filename.
     */
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Files will be stored with their original name
    }
});

/**
 * Creates an instance of multer with the defined storage configuration.
 * This instance can be used as middleware to handle file uploads in routes.
 */
export const upload = multer({ storage });
