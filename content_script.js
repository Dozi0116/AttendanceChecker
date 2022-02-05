import elementClasses from './element_classes'

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch (request.method) {
    case 'check':
      sendResponse(checkAttendance(request))
      break
    case 'get-attended-member':
      sendResponse(getAttendedMember())
      break
    case 'get-scheduled-member':
      sendResponse(getScheduledMember())
      break
  }
})

function checkAttendance(request) {
  const requireMemberNames = request.members
  const attendedMemberDivs = document.getElementsByClassName(elementClasses.ATTENDED_MENBER_CLASS)

  if(attendedMemberDivs.length == 0) {
    alert('参加者の一覧が見当たりません。参加者一覧を開いていますか？(開いててもこの表示が出るならMeetの仕様が変わったのかもしれない…😇)')
    return 'error'
  }

  const attendedMemberNames = Array.from(attendedMemberDivs).map(span => span.innerHTML)

  const notAttendedMemberNames = []

  requireMemberNames.forEach(memberName => {
    if (!attendedMemberNames.includes(memberName)) {
      notAttendedMemberNames.push(memberName)
    }
  })

  if (notAttendedMemberNames.length > 0){
    alert(notAttendedMemberNames.join('さん,') + "さんがいないようです")
    return 'vacancy'
  } else {
    alert('全員出席しています！')
    return 'ok'
  }

}

function getAttendedMember () {
  const attendedMemberDivs = document.getElementsByClassName(elementClasses.ATTENDED_MENBER_CLASS)

  if(attendedMemberDivs.length == 0) {
    alert('参加者の一覧が見当たりません。参加者一覧を開いていますか？(開いててもこの表示が出るならMeetの仕様が変わったのかもしれない…😇)')
    return []
  }

  const attendedMemberNames = Array.from(attendedMemberDivs).map(span => span.innerHTML)

  return attendedMemberNames
}

function getScheduledMember () {
  const scheduledMemberDivs = document.getElementsByClassName(elementClasses.SCHEDULED_MEMBER_CLASS)

  if(scheduledMemberDivs.length == 0) {
    alert('参加予定者の一覧が見当たりません。Googleカレンダーで予定の参加者一覧を開いていますか？(開いててもこの表示が出るならGoogleカレンダーの仕様が変わったのかもしれない…😇)')
    return []
  }

  const scheduledMemberNames = Array.from(scheduledMemberDivs).map(span => span.innerHTML)

  return scheduledMemberNames
}