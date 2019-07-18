package v1

import (
	"time"

	"github.com/anydemo/go-grpc-http-rest-microservice/utils"

	"github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog"
	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/api/v1"
	"github.com/sirupsen/logrus"

	"github.com/golang/protobuf/ptypes"
	tspb "github.com/golang/protobuf/ptypes/timestamp"
)

func toTimestamp(t time.Time) *tspb.Timestamp {
	ret, err := ptypes.TimestampProto(t)
	if err != nil {
		logrus.WithError(err).Error("toTimestamp err")
	}
	return ret
}
func fromTimestamp(timestamp *tspb.Timestamp) time.Time {
	ret, err := ptypes.Timestamp(timestamp)
	if err != nil {
		logrus.WithError(err).Warnf("pb-timestamp to time")
	}
	return ret
}

func toBlog(blg *blog.Blog) *v1.Blog {
	ret := v1.Blog{
		Id:        blg.ID.String(),
		Title:     blg.Title,
		CreatorId: blg.CreatorID.String(),
		CreatedAt: toTimestamp(blg.CreatedAt),
	}
	return &ret
}

func fromBlog(from *v1.Blog) *blog.Blog {
	ret := blog.Blog{
		Title:     from.Title,
		Content:   from.GetDescription(),
		CreatorID: utils.Str2UUID(from.GetCreatorId()),
	}
	return &ret
}

func toBlogs(blgs []blog.Blog) []*v1.Blog {
	ret := []*v1.Blog{}
	for _, blg := range blgs {
		blg := blg
		ret = append(ret, toBlog(&blg))
	}
	return ret
}
