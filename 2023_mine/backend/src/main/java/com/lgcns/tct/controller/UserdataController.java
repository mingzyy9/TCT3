package com.lgcns.tct.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lgcns.tct.dto.UsedListDto;
import com.lgcns.tct.dto.UsedataDto;
import com.lgcns.tct.dto.UserInfoDto;
import com.lgcns.tct.service.UsedataService;
import com.lgcns.tct.service.UserService;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/v1")
@RequiredArgsConstructor
public class UserdataController {

	private final UsedataService usedataService;
	private final UserService userService;


	//제공 api : 수정 불가
	@RequestMapping(value = "/user/{user_no}", method = RequestMethod.GET)
	public UserInfoDto getUseInfo(@PathVariable("user_no")String user_no) {
		
		UserInfoDto result = userService.getUserInfo(user_no);
		return result;
	}
	
	//제공 api : 해당 api를 바탕으로 프론트엔드를 구현하시오
	@RequestMapping(value = "/user/{user_no}/usage/summary", method = RequestMethod.GET)
	public UsedataDto getUseData(@PathVariable("user_no")String user_no , @RequestParam("ptype")int ptype ) {
		String start_dt = getStartDate(ptype);
		
		UsedataDto result = usedataService.getUseData(user_no, start_dt);
        
		return result;
	}

	// 작성해야할 api
	@RequestMapping(value = "/user/{user_no}/usage", method = RequestMethod.GET)
	public Map<String, Object> getUsedList(@PathVariable("user_no")String user_no , @RequestParam("ptype")int ptype ) {
		
		//🔨🔨이곳에 코드를 작성하세요!
		String start_dt = getStartDate(ptype);
		Map<String, Object> result = usedataService.getUsedList(user_no, start_dt);
		return result;

	}



	// 날짜 계산을 위한 제공 method
	private String getStartDate(int type){
		Calendar currentCalendar = Calendar.getInstance();
		int nType =  type;		

		switch(nType){
			case 1: // 1주일 전
				currentCalendar.add(Calendar.DATE, -7);	
			break;
			case 2: // 1달 전
				currentCalendar.add(Calendar.MONTH, -1);
			break;
			case 3: // 3달 전
				currentCalendar.add(Calendar.MONTH, -3);
			break;
			default:
				currentCalendar.add(Calendar.DATE, -7);				
			break;
		}
		String returnDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(currentCalendar.getTime());
		return returnDate;
	}


}