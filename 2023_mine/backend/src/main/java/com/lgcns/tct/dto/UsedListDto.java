package com.lgcns.tct.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsedListDto {

    //🔨🔨이곳에 코드를 작성하세요! 
    private String use_no;
	private int use_distance;
    private int use_time;
	private String use_start_dt;
	private String use_end_dt;
	private String pay_datetime;
    private int card_pay;
    private int point_pay;
}