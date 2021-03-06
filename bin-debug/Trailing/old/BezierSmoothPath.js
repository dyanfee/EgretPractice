var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 贝塞尔路径平滑
 * 给定一组坐标点（支持首尾相连形成闭合图形）描述的路径S，通过三阶贝塞尔曲线平滑路径S
 */
var BezierSmoothPath = (function () {
    function BezierSmoothPath() {
    }
    /**
     * 获取三阶贝塞尔曲线在某一t时刻的点
     * @param t 时间系数 范围 [0,1]; t = 0时为起点坐标，t = 1 时为终点坐标
     * @param points p0 起点 p1 控制点1 p2 控制点2 p3 终点
     */
    BezierSmoothPath.getPoint = function (t, points) {
        var p0 = points[0];
        var p1 = points[1];
        var p2 = points[2];
        var p3 = points[3];
        var x = p0.x * Math.pow(1 - t, 3) + 3 * p1.x * t * Math.pow(1 - t, 2) + 3 * p2.x * t * t * (1 - t) + p3.x * Math.pow(t, 3);
        var y = p0.y * Math.pow(1 - t, 3) + 3 * p1.y * t * Math.pow(1 - t, 2) + 3 * p2.y * t * t * (1 - t) + p3.y * Math.pow(t, 3);
        return { x: x, y: y };
    };
    /**
     * 通过输入点获取绘制贝塞尔需要的点
     * @param inputPoints 原始点
     * @param smooth 推荐值0.5，建议范围[0,1]，通过smooth系数控制曲线的平滑程度，1最平滑，0不平滑（跟原路径一样）
     * @param useNormalSmoothRange 是否使用正常[0, 1]的平滑区间，若为false，当smooth < 0 || smooth > 1 是有意想不到的效果
     */
    BezierSmoothPath.getBezierPoints = function (inPoints, smooth, useNormalSmoothRange) {
        if (smooth === void 0) { smooth = 0; }
        if (useNormalSmoothRange === void 0) { useNormalSmoothRange = true; }
        // 补点
        var supPoints = [];
        for (var i = 0, l_i = inPoints.length - 3; i <= l_i; i++) {
            var twoPpoints = BezierSmoothPath.getOffsetLine(inPoints[i], inPoints[i + 1], inPoints[i + 2], smooth, useNormalSmoothRange);
            supPoints = supPoints.concat(twoPpoints);
        }
        // 首尾相连情况补点		
        var pStart = inPoints[0];
        var pEnd = inPoints[inPoints.length - 1];
        var isStartLinkEnd = pStart.x == pEnd.x && pStart.y == pEnd.y;
        if (isStartLinkEnd) {
            var twoPpoints = BezierSmoothPath.getOffsetLine(inPoints[inPoints.length - 2], inPoints[0], inPoints[1], smooth, useNormalSmoothRange);
            supPoints = supPoints.concat(twoPpoints);
        }
        // 插入点
        var finalPoints = [];
        for (var i = 0, j = 0, l_i = inPoints.length - 1; i < l_i; i++) {
            if (i == 0) {
                finalPoints.push(inPoints[i]);
                if (isStartLinkEnd)
                    finalPoints.push(supPoints[supPoints.length - 1]);
                else
                    finalPoints.push(inPoints[i]);
                finalPoints.push(supPoints[j++]);
                finalPoints.push(inPoints[i + 1]);
            }
            else if (i == l_i - 1) {
                finalPoints.push(inPoints[i]);
                finalPoints.push(supPoints[j++]);
                if (isStartLinkEnd)
                    finalPoints.push(supPoints[j++]);
                else
                    finalPoints.push(inPoints[i + 1]);
                finalPoints.push(inPoints[i + 1]);
            }
            else {
                finalPoints.push(inPoints[i]);
                finalPoints.push(supPoints[j++]);
                finalPoints.push(supPoints[j++]);
                finalPoints.push(inPoints[i + 1]);
            }
        }
        return {
            finalPoints: finalPoints,
            supPoints: supPoints
        };
    };
    /**
     * 相连两条线段的中点连接线a, 将a的中点平移到两条线的顶点p1，得到平移后a的起始点坐标（描述一条线段）
     */
    BezierSmoothPath.getOffsetLine = function (p0, p1, p2, smooth, useNormalSmoothRange) {
        // 线段p0p1的中点a
        var p0_1 = {};
        p0_1.x = (p0.x + p1.x) / 2;
        p0_1.y = (p0.y + p1.y) / 2;
        // 线段p1p2的中点b
        var p1_2 = {};
        p1_2.x = (p1.x + p2.x) / 2;
        p1_2.y = (p1.y + p2.y) / 2;
        // 两中点连接线ab的中点
        var center = {};
        center.x = (p0_1.x + p1_2.x) / 2;
        center.y = (p0_1.y + p1_2.y) / 2;
        // 通过k控制线段(p0_1, p1_2)的长度（控制p0_1点与p1_2点接近center程度）
        if (useNormalSmoothRange)
            smooth = Math.min(Math.max(smooth, 0), 1); // 强制控制平滑区间 [0, 1]
        var dx1 = p0_1.x - center.x;
        var dy1 = p0_1.y - center.y;
        p0_1.x -= dx1 * (1 - smooth);
        p0_1.y -= dy1 * (1 - smooth);
        var dx2 = p1_2.x - center.x;
        var dy2 = p1_2.y - center.y;
        p1_2.x -= dx2 * (1 - smooth);
        p1_2.y -= dy2 * (1 - smooth);
        // 将线段(p0_1, p1_2)平移到顶点p1
        var offsetX = p1.x - center.x;
        var offsetY = p1.y - center.y;
        p0_1.x += offsetX;
        p0_1.y += offsetY;
        p1_2.x += offsetX;
        p1_2.y += offsetY;
        return [p0_1, p1_2];
    };
    return BezierSmoothPath;
}());
__reflect(BezierSmoothPath.prototype, "BezierSmoothPath");
//# sourceMappingURL=BezierSmoothPath.js.map