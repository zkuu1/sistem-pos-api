const prisma = require('../client/prisma')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ errors: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        
        // Validasi token tidak kosong
        if (!token) {
            return res.status(401).json({ errors: "Unauthorized" });
        }

        const user = await prisma.user.findFirst({
            where: { token }
        });

        if (!user) {
            return res.status(401).json({ errors: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ errors: "Internal server error" });
    }
}

const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ errors: "Unauthorized" })
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ errors: "Forbidden: Admin only" })
    }

    next()
}

module.exports = {
    authMiddleware,
    adminMiddleware
}