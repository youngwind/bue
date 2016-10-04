/**
 * Created by youngwind on 16/9/6.
 */

/**
 * 批处理构造函数
 * @constructor
 */
function Batcher() {
    this.reset();
}

/**
 * 批处理充值
 */
Batcher.prototype.reset = function () {
    this.has = {};
    this.queue = [];
    this.waiting = false;
};

/**
 * 将事件添加到队列中
 * @param job {Watcher} watcher事件
 */
Batcher.prototype.push = function (job) {
    if (!this.has[job.id]) {
        this.queue.push(job);
        this.has[job.id] = job;
        if (!this.waiting) {
            this.waiting = true;
            setTimeout(() => {
                // isFlushing, 此字段用来处理多重异步队列的问题
                this.isFlushing = true;
                this.flush();
                this.isFlushing = false;
            });
        }
    }
};

/**
 * 执行并清空事件队列
 */
Batcher.prototype.flush = function () {
    this.queue.forEach((job) => {
        // job.cb.call(job.ctx);
        job.run();
    });
    this.reset();
};

module.exports = Batcher;
