import argparse
import requests
import sys

SCOPES = ["healthcheck", "resetall", "questionnaire_upd", "resetq", "questionnaire",\
    "question", "doanswer", "getsessionanswers", "getquestionanswers", "admin"]

#def se2268():
#    return 0
    #res = requests.get('https://localhost:9103/intelliq_api/admin/healthcheck')

def healthcheck(args):
    return 0

def resetall(args):
    return 0
  
def questionnaire_upd(args):
    return 0

def resetq(args):
    return 0

def questionnaire(args):
    return 0

def question(args):
    return 0
  
def doanswer(args):
    print(args)
    return 0

def getsessionanswers(args):
    return 0

def getquestionanswers(args):
    return 0

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    subs = parser.add_subparsers(
    title="scopes", help="Choose a scope"
)
    
    #healthcheck
    healthcheck_parser = subs.add_parser("healthcheck", help="check end-to-end connectivity")
    healthcheck_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    healthcheck_parser.set_defaults(func=healthcheck)

    #resetall
    resetall_parser = subs.add_parser("resetall", help="reset all")
    resetall_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    resetall_parser.set_defaults(func=resetall)

    #questionnaire_upd
    questionnaire_upd_parser = subs.add_parser("questionnaire_upd", help="update questionnaire")
    questionnaire_upd_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    questionnaire_upd_parser.add_argument("--source", nargs=1, type=str, help="Name of the JSON file that contains the questionnaire.", required=True)
    questionnaire_upd_parser.set_defaults(func=questionnaire_upd)

    #resetq
    resetq_parser = subs.add_parser("resetq", help="reset questionnaire")
    resetq_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    resetq_parser.add_argument("--questionnaire_id", nargs=1, type=str, help="Questionnaire ID", required=True)
    resetq_parser.set_defaults(func=resetq)

    #questionnaire
    questionnaire_parser = subs.add_parser("questionnaire", help="show questionnaire")
    questionnaire_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    questionnaire_parser.add_argument("--questionnaire_id", nargs=1, type=str, help="Questionnaire ID", required=True)
    questionnaire_parser.set_defaults(func=questionnaire)

    #question
    question_parser = subs.add_parser("question", help="show question")
    question_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    question_parser.add_argument("--questionnaire_id", nargs=1, type=str, help="Questionnaire ID", required=True)
    question_parser.add_argument("--question_id", nargs=1, type=str, help="Question ID", required=True)
    question_parser.set_defaults(func=question)

    #doanswer
    doanswer_parser = subs.add_parser("doanswer", help="answer a questionnaire")
    doanswer_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    doanswer_parser.add_argument("--questionnaire_id", nargs=1, type=str, help="Questionnaire ID", required=True)
    doanswer_parser.add_argument("--question_id", nargs=1, type=str, help="Question ID", required=True)
    doanswer_parser.add_argument("--session_id", nargs=1, type=str, help="Session ID", required=True)
    doanswer_parser.add_argument("--option_id", nargs=1, type=str, help="Option ID", required=True)
    doanswer_parser.set_defaults(func=doanswer)

    #getsessionanswers
    getsessionanswers_parser = subs.add_parser("getsessionanswers", help="session answers")
    getsessionanswers_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    getsessionanswers_parser.add_argument("--questionnaire_id", nargs=1, type=str, help="Questionnaire ID", required=True)
    getsessionanswers_parser.add_argument("--session_id", nargs=1, type=str, help="Session ID", required=True)
    getsessionanswers_parser.set_defaults(func=getsessionanswers)

    #getquestionanswers
    getquestionanswers_parser = subs.add_parser("getquestionanswers", help="get question answers")
    getquestionanswers_parser.add_argument("--format", nargs=1, choices=["json", "csv"], help="Format of output", required=True)
    getquestionanswers_parser.add_argument("--questionnaire_id", nargs=1, type=str, help="Questionnaire ID", required=True)
    getquestionanswers_parser.add_argument("--question_id", nargs=1, type=str, help="Question ID", required=True)
    getquestionanswers_parser.set_defaults(func=getquestionanswers)
    
    parsed_args = parser.parse_args()

    if hasattr(parsed_args, 'func'):
        parsed_args.func(parsed_args)
    else:
        parser.print_help()
        sys.exit(2)
    

  