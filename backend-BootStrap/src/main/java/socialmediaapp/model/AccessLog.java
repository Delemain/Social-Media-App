package socialmediaapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "access_logs")
public class AccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logid")
    private Long logid;

    @Column(name = "userid")
    private Long userid;

    @Column(name = "log_type")
    private String logType;

    @Column(name = "log_time")
    private LocalDateTime logTime;

    // Constructors
    public AccessLog() {
    }

    public AccessLog(Long userid, String logType, LocalDateTime logTime) {
        this.userid = userid;
        this.logType = logType;
        this.logTime = logTime;
    }

    // Getters and Setters
    public Long getLogid() {
        return logid;
    }

    public void setLogid(Long logid) {
        this.logid = logid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public LocalDateTime getLogTime() {
        return logTime;
    }

    public void setLogTime(LocalDateTime logTime) {
        this.logTime = logTime;
    }
}
