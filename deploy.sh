if [ "$TRAVIS_PULL_REQUEST" == "false" ]
then
    if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "stage" ]
        then
            semantic-release pre &&
            git stash &&
            pm2 deploy ecosystem.json $TRAVIS_BRANCH &&
            git stash apply --index &&
            semantic-release post || echo 'Deployment is not run';
        else
            echo 'Deployment is not run because the branch is wrong';
    fi;
else
    echo 'Deployment is not run because this is pull request';
fi;
